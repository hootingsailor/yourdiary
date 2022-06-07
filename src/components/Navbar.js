import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const [mode, setMode] = useState("light");

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    const onChange = (e)=> {
        if(mode === "light")
            setMode("dark");
        else
            setMode("light");
    }

    return (
        <nav className={`navbar navbar-expand-lg bg-${mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">yourDiary</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="about">About</Link>
                        </li>
                    </ul>
                    <div className="form-check form-switch mx-2">
                        <input className="form-check-input" type="checkbox" role="switch" id="darkMode" onChange={onChange}/>
                            <label className="form-check-label" htmlFor="darkMode">{mode === "dark" ? "Light Mode" : "Dark Mode"}</label>
                    </div>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
