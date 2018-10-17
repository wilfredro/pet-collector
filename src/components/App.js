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
    return { mode: state.mode, editId: state.editId };
};

 const App = ({mode, editId, toggleMode}) => (
    <div>
        <Header />
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Welcome Pet Lover!</h1>
                <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                <h2>Pet List  <button onClick={() => {toggleMode("CREATE")}} className="btn btn-outline-primary">Add Pet</button></h2>
                <PetList/>
                </div>
                <div className="col-sm-8">
                    { 
                        mode === "CREATE" ?   
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