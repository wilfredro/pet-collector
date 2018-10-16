import React from "react";
import { connect } from "react-redux";
import { editMode } from "../actions/index.js";

const mapStateToProps = state => {
  return { pets: state.pets };
};

const mapDispatchToProps = dispatch => {
    return {
      editMode: (mode,editId) => dispatch(editMode(mode,editId))
    };
  };

const Listing = ({ pets, editMode }) => (
  <ul className="list-group">
    { Object.entries(pets).map(([key,value]) => (
        <li className='list-group-item' key={key}>
            <div>
                {value.email}
                <button className="btn btn-outline-secondary float-right" onClick={() => {editMode("EDIT", key)}}>Edit</button>
            </div>
        </li>
    ))}
  </ul>
);
const PetList = connect(mapStateToProps, mapDispatchToProps)(Listing);
export default PetList;