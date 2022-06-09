import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./Routes.css";

import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import Profile from "../components/Login/Profile";
import MainView from "../views/MainView";
import PatientsView from "../views/PatientsView";
import BedsView from "../views/BedsView";
import BoardModerator from "../components/Login/BoardModerator";
import { BsHeartFill } from "react-icons/bs";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { MdDonutLarge } from "react-icons/md";
import { history } from "../helpers/history";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "../common/EventBus";
import { Container, Nav, Navbar } from "react-bootstrap";
import jwt from "jwt-decode";

function Routing (){
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      var decoded = jwt(currentUser.accessToken);
      //setShowModeratorBoard(currentUser.roles.includes("ROLE_Create-users-sys"));
      setShowAdminBoard(decoded.role.includes("ROLE_Query-QR"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router history={history}>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">CRUEV Valle <BsHeartFill /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav ">
              <Nav className="mr-auto">



                {showModeratorBoard && (
                  <li className="nav-item">
                    <NavLink to={"/mod"} className="nav-link">
                      Moderator Board
                    </NavLink>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <NavLink to={"/crue/menu"} className="nav-link">
                      General
                    </NavLink>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <NavLink to={"/crue/patients"} className="nav-link">
                      Pacientes
                    </NavLink>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <NavLink to={"/crue/addBed"} className="nav-link">
                      Camas UCI
                    </NavLink>
                  </li>
                )}

              </Nav>
              <Nav className="ml-auto">
              {currentUser ? (
                  <div className="navbar-nav ">
                    <li className="nav-item">
                      <NavLink to={"/profile"} className="nav-link">
                        {currentUser.userUsername}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={logOut}>
                        <MdDonutLarge /> LogOut
                      </a>
                    </li>
                  </div>
                ) : (
                  <div className="navbar-nav ">
                    <li className="nav-item">
                      <NavLink to={"/login"} className="nav-link">
                        <MdDonutLarge /> Login
                      </NavLink>
                    </li>
                  </div>
                )}
              </Nav>



            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/crue/menu" component={MainView} />
            <Route path="/crue/patients" component={PatientsView} />
            <Route path="/crue/addBed" component={BedsView} />
            <Route path="/mod" component={BoardModerator} />
            
          </Switch>
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    </Router>
  );
};

export default Routing;
