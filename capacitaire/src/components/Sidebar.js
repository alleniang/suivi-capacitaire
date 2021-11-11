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
import '../styles/MenuVertical.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Switch, Route } from "react-router-dom";

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
                                    <Link to={"../Composants/AjoutBU"} className="nav-link">
                                        Ajouter
                                    </Link>
                                    <Link to={"../Composants/ListBU"} className="nav-link">
                                        Lister
                                    </Link>
                                </div>
                                <NavLink exact to="/dashboard" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="columns">
                                        Programme
                                    </CDBSidebarMenuItem>
                                </NavLink>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to={"../Composants/AjoutProgramme"} className="nav-link">
                                        Ajouter
                                    </Link>
                                    <Link to={"../Composants/ListProgramme"} className="nav-link">
                                        Lister
                                    </Link>
                                </div>
                                <NavLink exact to="/dashboard" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="columns">
                                        Operation
                                    </CDBSidebarMenuItem>
                                </NavLink>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to={"../Composants/AjoutOperation"} className="nav-link">
                                        Ajouter
                                    </Link>
                                    <Link to={"../Composants/ListOperation"} className="nav-link">
                                        Lister
                                    </Link>
                                </div>
                                <NavLink exact to="/dashboard" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem icon="columns">
                                        Plateau
                                    </CDBSidebarMenuItem>
                                </NavLink>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to={"../Composants/AjoutPlateau"} className="nav-link">
                                        Ajouter
                                    </Link>
                                    <Link to={"../Composants/ListPlateau"} className="nav-link">
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
                        <Route path="/Composants/AjoutPlateau" component={AjoutPlateau} />
                        <Route path="/Composants/AjoutBU" component={AjoutBU} />
                        <Route path="/Composants/AjoutProgramme" component={AjoutProgramme} />
                        <Route path="/Composants/AjoutOperation" component={AjoutOperation} />
                        <Route path="/Composants/ListBU" component={ListBu} />
                        <Route path="/Composants/ListProgramme" component={ListProgramme} />
                        <Route path="/Composants/ListOperation" component={ListOperation} />
                        <Route path="/Composants/ListPlateau" component={ListPlateau} />
                    </Switch>
                </div>
            </Col>
        </Row>


    );
};

export default Sidebar;