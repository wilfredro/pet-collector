import React from "react";
import PetList from "./List";
import PetForm from "./Form";
import Header from "./Header";
import rollieImg from '../images/rollie.png'
import { connect } from "react-redux";
import { toggleMode } from '../actions/index.js';

const mapDispatchToProps = dispatch => {
    return {
        toggleMode: (mode) => dispatch(toggleMode(mode)),
    };
  };

const mapStateToProps = state => {
    return { mode: state.mode, petsCount: Object.keys(state.pets).length };
};

 const App = ({mode, toggleMode, petsCount}) => (
    <div>
        <Header />
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
            <div className="row">
                <div className="col-sm-10">
                <h1 className="display-4">Welcome Hooman!</h1>
                <p className="lead">Hi, my name is Rollie. I'm a 2-year-old english bulldog living in New York City! I'm looking for some new fur-ends to hang out with, so I told my dad to build this app to collect pet and owner info. We can schedule play dates!</p>
                <p className="lead">If you're too cool for this, you can follow me on the GRAM <a rel="noopener noreferrer" className="card-link" href="https://www.instagram.com/rollie_the_bully/" target="_blank">@rollie_the_bulldog</a>!</p>
                </div>
                <div className="col-sm-2">
                    <img className="rounded" src={rollieImg} alt="Hello Ladies!"/>
                </div>
                </div>
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
                        mode !== "" ?   
                        <PetForm />
                        : null
                    }
                </div>
            </div>
        </div>
    </div> 
);

export default connect(mapStateToProps,mapDispatchToProps)(App);