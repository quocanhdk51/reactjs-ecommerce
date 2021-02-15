import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Profile from "./Profile";
import BoardUser from "./BoardUser";
import BoardModerator from "./BoardModerator";
import BoardAdmin from "./BoardAdmin";
import Product from "./Products";
import Brands from "./Brands";
import {DataContext} from "./DataProvider";
import Cart from './Cart';
import About from './About';
import Contact from './Contact';
import {FaCartPlus} from 'react-icons/fa';


import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import { history } from "../helpers/history";
import Details from "./Details";

const Header = () => {
    const value = useContext(DataContext)
    const [cart] = value.cart

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
        dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
        setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
        setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        }
    }, [currentUser]);

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <Router history={history}>
        <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
            Motor Shop
        </Link>
        <div className="navbar-nav mr-auto">
            <li className="nav-item">
            <Link to={"/home"} className="nav-link">
                Home
            </Link>
            </li>

            <li className="nav-item">
            <Link to={"/products"} className="nav-link">
                Product
            </Link>
            </li>
            
            <li className="nav-item">
            <Link to={"/contact"} className="nav-link">
                Contact
            </Link>
            </li>

            <li className="nav-item">
            <Link to={"/about"} className="nav-link">
                About
            </Link>
            </li>

            {showModeratorBoard && (
            <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                Moderator Board
                </Link>
            </li>
            )}

            {showAdminBoard && (
            <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                Admin Board
                </Link>
            </li>
            )}

            {currentUser && (
            <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                User
                </Link>
            </li>
            )}
        </div>

        {currentUser ? (
            <div className="navbar-nav ml-auto">
            <li className="cart-icon nav-item">
                <span>{cart.length}</span>
                <Link to="/cart">
                    <FaCartPlus />
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                {currentUser.username}
                </Link>
            </li>
            <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
                </a>
            </li>
            </div>
        ) : (
            <div className="navbar-nav ml-auto">
            <li className="cart-icon nav-item">
            <span>{cart.length}</span>
            <Link to="/cart">
                <FaCartPlus />
            </Link>
            </li>
            <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                Login
                </Link>
            </li>

            <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                Sign Up
                </Link>
            </li>
            </div>
        )}
        </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route exact path="/products" component={Product} />
              <Route exact path="/products/:brand" component={Brands} />
              <Route exact path="/products/id/:id" component={Details} />
              <Route path="/cart" component={Cart}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/About" component={About}/>
            </Switch>
          </div>
        </div>
      </Router>
    )
}

export default Header;