import React from "react";
import PetList from "./List";
import PetForm from "./Form";
import Header from "./Header";
import { connect } from "react-redux";
import { toggleMode } from '../actions/index.js';

const mapDispatchToProps = dispatch => {
    return {
        toggleMode: (mode) => dispatch(toggleMode(mode)),
    };
  };

const mapStateToProps = state => {
    return { mode: state.mode, editId: state.editId, petsCount: Object.keys(state.pets).length };
};

 const App = ({mode, editId, toggleMode, petsCount}) => (
    <div>
        <Header />
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Welcome Hooman!</h1>
                <p className="lead">Hi, my name is Rollie. I'm almost a 2 year old english bulldog living in New York City! I'm looking for some furends to hang out with so I told my dad to build this app to collect pet and owner info (we can schedule play dates!) </p>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <h2>{petsCount} {petsCount === 1 ? "pet" :"pets"} added  <button onClick={() => {toggleMode("ADD")}} className="btn btn-outline-primary float-right">Add Pet</button></h2>
                    <PetList/>
                </div>
                <div className="col-sm-8">
                    { 
                        mode === "ADD" ?   
                        <PetForm />
                        : null
                    }
                    { 
                        mode === "EDIT" ?   
                        <PetForm userId={editId} />
                        : null
                    }
                </div>
            </div>
        </div>
    </div> 
);

export default connect(mapStateToProps,mapDispatchToProps)(App);