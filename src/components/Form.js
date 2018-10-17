import React from 'react'
import { withFormik, Field, Form, ErrorMessage } from 'formik'
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
    mode,
    toggleMode,
    editId,
    removePet,
}) => (
   <div className="container">
       <div className="row">
        <div className="col-sm-12">
            <Form>
                <div className="row">
                    <div className="col-sm-12">
                        <h3>{mode === "EDIT" ? "Edit" : "Enter"} Your Info:  
                        {mode === "EDIT" && <button className="btn btn-danger float-right" onClick={(e) => {
                            e.preventDefault();
                            removePet(editId)
                            }}>Delete</button>}</h3>
                        </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="name">Your name is</label>
                            <Field className={"form-control " + (touched.name && errors.name && "is-invalid")} type="input" name="name" placeholder="Your name is"/>   
                            <ErrorMessage className="invalid-feedback" component="span" name="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your email is</label>
                            <Field className={"form-control " + (touched.email && errors.email && "is-invalid")} type="email" name="email" placeholder="Your email is"/>
                            <ErrorMessage className="invalid-feedback" component="span" name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip">Your zip code is</label>
                            <Field className={"form-control " + (touched.zip && errors.zip && "is-invalid")} maxLength="5" type="tel" name="zip" placeholder="Your zip code is"/>
                            <ErrorMessage className="invalid-feedback" component="span" name="zip" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="petName">Your pet's name is</label>
                            <Field className={"form-control " + (touched.petName && errors.petName && "is-invalid")} type="input" name="petName" placeholder="Your pet's name is"/>   
                            <ErrorMessage className="invalid-feedback" component="span" name="petName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Your pet is a</label>
                            <Field className={"form-control " + (touched.gender && errors.gender && "is-invalid")} name="gender" component="select">
                                <option value="">Your pet is a</option>
                                <option value="He">He</option>
                                <option value="She">She</option>
                            </Field>
                            <ErrorMessage className="invalid-feedback" component="span" name="gender" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="breed">Your pet's breed is</label>
                            <Field className={"form-control " + (touched.breed && errors.breed && "is-invalid")} type="input" name="breed" placeholder="Your pet's breed is"/>
                            <ErrorMessage className="invalid-feedback" component="span" name="breed" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="breed">Your pet's weight is</label>
                            <Field className={"form-control " + (touched.weight && errors.weight && "is-invalid")} type="tel" name="weight" maxLength="3" placeholder="Your pet's weight is (optional)"/>
                            <ErrorMessage className="invalid-feedback" component="span" name="weight" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group float-right">
                            <button className="btn btn-primary mr-2" type="submit">{mode === "ADD" ? "Add" : "Update"}</button>
                            <button className="btn btn-secondary" type="button" onClick={(e) => {
                                e.preventDefault();
                                toggleMode("") //reset mode
                            }}>Cancel</button>
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
    mapPropsToValues({ name, email, zip, petName, gender, breed, weight, id, pets, editId, mode }) {
        if (editId > 0 && mode === "EDIT") {
            return {
                name: pets[editId].name || '',
                email: pets[editId].email || '',
                zip: pets[editId].zip || '',
                petName: pets[editId].petName || '',
                gender: pets[editId].gender || '',
                breed: pets[editId].breed || '',
                weight: pets[editId].weight || '',
                id: parseInt(editId, 10)
            }
        }
        else {
            return {
                name: name || '',
                email: email || '',
                zip: zip || '',
                petName: petName || '',
                gender: gender || '',
                breed: breed || '',
                weight: weight || '',
                id: id || 1
            }
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Your name is required'),
        email: Yup.string().email('Enter a valid email').required('Your email is required'),
        zip: Yup.string().matches(/^[0-9]*$/, 'Please enter a 5 digit zip code').min(5, 'Please enter a 5 digit zip code').required('Your zip code is required'),
        petName: Yup.string().required('Your pet\'s name is required'),
        gender: Yup.string().required('Your pet\'s gender is required'),
        breed: Yup.string().required('Your pet\'s breed is required'),
        weight: Yup.number().min(1).max(500).typeError('Please enter numbers only'),
      }),
    handleSubmit(values,bag) {
        let currMode = bag.props.mode;
        if (currMode === "EDIT") {
                if (JSON.stringify(bag.props.pets[bag.props.editId]) !== JSON.stringify(values)) {
                    let obj = {[bag.props.editId] : values};
                    bag.props.updatePet(obj);
            }
        }
        else {
            let obj = {[bag.props.id] : values};
            bag.props.addPet(obj);
            bag.resetForm();
        }
        //reset mode
        bag.props.toggleMode("");
    },
})(Collector);

const PetForm = connect(mapStateToProps, mapDispatchToProps)(FormikForm);

export default PetForm