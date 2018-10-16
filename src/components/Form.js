import React, { Component } from 'react'
import { withFormik, Field, Form } from 'formik'
import * as Yup from 'yup';
import { connect } from "react-redux";
import { addPet, toggleMode, updatePet, removePet } from "../actions/index.js";

const mapDispatchToProps = dispatch => {
    return {
      addPet: pet => dispatch(addPet(pet)),
      updatePet: pet => dispatch(updatePet(pet)),
      removePet: id => dispatch(removePet(id)),
      toggleMode: mode => dispatch(toggleMode(mode)),
    };
  };

const mapStateToProps = state => {
    return { 
        id: state.id, 
        mode: state.mode, 
        pets: state.pets,
        editId: state.editId  
    };
};

const Collector = ({
    values,
    errors,
    touched,
    id,
    mode,
    toggleMode,
    pets,
    editId,
    removePet
}) => (
   <div className="container">
       <div className="row">
        <div className="col-sm-12">
            <Form>
                <div className="row">
                    <div className="col-sm-6">
                    <h3>Owner Info</h3>
                        <div className="form-group">
                            <Field className="form-control" type="input" name="name" placeholder="Your name"/>   
                            { touched.name && errors.name && <span>{errors.name}</span> }
                        </div>
                        <div className="form-group">
                            <Field className="form-control" type="email" name="email" placeholder="Your email"/>
                            { touched.email && errors.email && <span>{errors.email}</span> }
                        </div>
                        <div className="form-group">
                        <button className="btn btn-primary" type="submit">{mode === "CREATE" ? "Add" : "Update"}</button>
                        <button className="btn btn-secondary" type="button" onClick={() => {toggleMode("VIEW")}}>Cancel</button>
                        {mode === "EDIT" && <button className="btn btn-outline-danger" onClick={() => {removePet(editId)}}>Delete</button>}
                    </div>
                    </div>
                </div>
            </Form>
         </div>
        </div>
    </div>
);

const FormikForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ name, email, id, pets, userId, mode }) {
        if (userId > 0 && mode === "EDIT") {
            return {
                name: pets[userId].name || '',
                email: pets[userId].email || '',
            }
        }
        else {
            return {
                name: name || '',
                email: email || '',
                id: id || 1
            }
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Your name is required'),
        email: Yup.string().email('Enter a valid email').required('Your email is required')
      }),
    handleSubmit(values,bag) {
        let currMode = bag.props.mode;
        if (currMode === "EDIT") {
            let obj = {[bag.props.userId] : values};
            bag.props.updatePet(obj);
        }
        else {
            let obj = {[bag.props.id] : values};
            bag.props.addPet(obj);
            bag.resetForm();
        }
        bag.props.toggleMode("VIEW");
    },
})(Collector);

const PetForm = connect(mapStateToProps, mapDispatchToProps)(FormikForm);

export default PetForm