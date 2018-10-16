import React from 'react'
import { toggleMode } from '../actions';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
    return {
        toggleMode: (mode) => dispatch(toggleMode(mode)),
    };
  };

const Header = ({toggleMode}) => (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">PetCollector</a>
        <button onClick={() => {toggleMode("CREATE")}} className="btn btn-outline-primary">Add Pet</button>
    </header>
);

export default connect(null, mapDispatchToProps)(Header);