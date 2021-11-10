import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Link } from 'react-router-dom';
//import { Link } from 'react-router';
import '../styles/MenuVertical.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import {AjoutPlateau} from "./AjoutPlateau";
import {AjoutBU} from "./AjoutBU";
import {AjoutProgramme} from "./AjoutProgramme";
import {ListPlateau} from "./ListPlateau";
import { AjoutOperation } from './AjoutOperation';
import { ListBu } from './ListBu';
import { ListProgramme } from './ListProgramme';
import { ListOperation } from './ListOperation';

const Sidebar = () => {
    return (

        <Row>
            <Col md={4}>
                <div style={{ display: 'flex', height: '100%', overflow: 'scroll initial' }}>
                    <CDBSidebar textColer="#fff" backgroundColor="rgb(37, 90, 122)">
                        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                            <Link to="/dashboard">Dashboard</Link>
                        </CDBSidebarHeader>
                        <CDBSidebarContent className="sidebar-content">
                            <CDBSidebarMenu>
                                <NavLink exact to="/dashboard" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="columns">
                                        Business Unit
                                    </CDBSidebarMenuItem>
                                </NavLink>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to={"/AjoutBU"} className="nav-link">
                                        Ajouter
                                    </Link>
                                    <Link to={"/ListBU"} className="nav-link">
                                        Lister
                                    </Link>
                                </div>
                                <NavLink exact to="/dashboard" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="columns">
                                        Programme
                                    </CDBSidebarMenuItem>
                                </NavLink>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to={"/AjoutProgramme"} className="nav-link">
                                        Ajouter
                                    </Link>
                                    <Link to={"/ListProgramme"} className="nav-link">
                                        Lister
                                    </Link>
                                </div>
                                <NavLink exact to="/dashboard" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="columns">
                                        Operation
                                    </CDBSidebarMenuItem>
                                </NavLink>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to={"/AjoutOperation"} className="nav-link">
                                        Ajouter
                                    </Link>
                                    <Link to={"/ListOperation"} className="nav-link">
                                        Lister
                                    </Link>
                                </div>
                                <NavLink exact to="/dashboard" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="columns">
                                        Plateau
                                    </CDBSidebarMenuItem>
                                </NavLink>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to={"/AjoutPlateau"} className="nav-link">
                                        Ajouter
                                    </Link>
                                    <Link to={"/ListPlateau"} className="nav-link">
                                        Lister
                                    </Link>
                                </div>
                            </CDBSidebarMenu>
                        </CDBSidebarContent>
                        <CDBSidebarFooter style={{ textAlign: 'center' }}>
                            <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
                                sidebar footer
                            </div>
                        </CDBSidebarFooter>
                    </CDBSidebar>
                </div>
            </Col>
            <Col md={8}>
                <div className="wrapper">
                    <Switch>
                        <Route exact path='/' component={AjoutPlateau} />
                        <Route path="/AjoutPlateau" component={AjoutPlateau} />
                        <Route path="/AjoutBU" component={AjoutBU} />
                        <Route path="/AjoutProgramme" component={AjoutProgramme} />
                        <Route path="/AjoutOperation" component={AjoutOperation} />
                        <Route path="/ListBU" component={ListBu} />
                        <Route path="/ListProgramme" component={ListProgramme} />
                        <Route path="/ListOperation" component={ListOperation} />
                        <Route path="/ListPlateau" component={ListPlateau} />
                    </Switch>
                </div>
            </Col>
        </Row>


    );
};

export default Sidebar;