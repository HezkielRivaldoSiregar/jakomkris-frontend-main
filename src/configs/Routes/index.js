import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { NavbarMenu, NavbarMenuAdmin } from '../../components'
import { Home, Admin, Peta, Artikel, TentangKami, FAQ, Kontak, Detail, Forum, SummaryDashboard, Login, DataGereja, GerejaForm, DataArtikel, DataFaq, ArtikelForm, FaqForm } from '../../pages'
import React, { Component } from 'react'
import { isMobile } from "react-device-detect";


export class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidebarExpand: true,
            subMenu: ''
        }
    }

    DashboardContainer = () => (
        <>
            <NavbarMenuAdmin
                onExpandSidebar={(value) => this.handleExpandSidebar(value)}
                subMenu={this.state.subMenu}
            />
            <div className={isMobile ? "" : "menu-page-2 " + (this.state.isSidebarExpand ? 'expanded' : 'unexpanded')}>

                <Route path="/admin">
                    <Admin
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>

                <Switch>
                    <Route exact path="/dataGereja/create">
                        <GerejaForm
                          onSubMenu={(value) => this.handleSubMenu(value)}
                        />
                    </Route>

                    <Route exact path="/dataGereja/edit/:id">
                        <GerejaForm
                          onSubMenu={(value) => this.handleSubMenu(value)}
                        />
                    </Route>

                    <Route path="/dataGereja">
                        <DataGereja
                          onSubMenu={(value) => this.handleSubMenu(value)}
                        />
                    </Route>
                </Switch>

                <Switch>
                    <Route path="/dataArtikel/create">
                        <ArtikelForm
                            onSubMenu={(value) => this.handleSubMenu(value)}
                        />
                    </Route>

                    <Route path="/dataArtikel/edit/:id">
                        <ArtikelForm
                            onSubMenu={(value) => this.handleSubMenu(value)}
                        />
                    </Route>

                    <Route path="/dataArtikel">
                        <DataArtikel
                            onSubMenu={(value) => this.handleSubMenu(value)}
                        />
                    </Route>
                </Switch>

                <Switch>
                    <Route path="/dataFaq/create">
                        <FaqForm
                            onSubMenu={(value) => this.handleSubMenu(value)}
                        />
                    </Route>

                    <Route path="/dataFaq/edit/:id">
                        <FaqForm
                            onSubMenu={(value) => this.handleSubMenu(value)}
                        />
                    </Route>

                    <Route path="/dataFaq">
                        <DataFaq
                            onSubMenu={(value) => this.handleSubMenu(value)}
                        />
                    </Route>
                </Switch>
            </div>

        </>
    )

    LoginContainer = () => (
        <>
            <Route path="/login" component={Login} />
        </>
    )

    handleExpandSidebar(value) {
        this.setState({
            isSidebarExpand: value
        })
    }

    handleSubMenu(value) {
        this.setState({
            subMenu: value
        })
    }

    DefaultContainer = () => (
        <>
            <NavbarMenu
                onExpandSidebar={(value) => this.handleExpandSidebar(value)}
                subMenu={this.state.subMenu}
            />
            <div className={isMobile ? "menu-page-mobile" : "menu-page " + (this.state.isSidebarExpand ? 'expanded' : 'unexpanded')}>
                <Route exact strict path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path="/home">
                    <Home
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>

                <Route path="/peta">
                    <Peta
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>
                <Route path="/artikel">
                    <Artikel
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>
                <Route path="/tentang">
                    <TentangKami
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>
                <Route path="/faq">
                    <FAQ
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>
                <Route path="/kontak">
                    <Kontak
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>

                <Route path="/detail">
                    <Detail
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>

                <Route path="/summaryDashboard">
                    <SummaryDashboard
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>

                <Route path="/forum">
                    <Forum
                        onSubMenu={(value) => this.handleSubMenu(value)}
                    />
                </Route>
            </div>
        </>
    )

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/admin" component={this.DashboardContainer} />
                        <Route exact path="/dataGereja" component={this.DashboardContainer} />
                        <Route exact path="/dataGereja/create" component={this.DashboardContainer} />
                        <Route exact path="/dataGereja/edit/:id" component={this.DashboardContainer} />
                        <Route exact path="/dataArtikel/create" component={this.DashboardContainer} />
                        <Route exact path="/dataArtikel/edit/:id" component={this.DashboardContainer} />
                        <Route exact path="/dataArtikel" component={this.DashboardContainer} />
                        <Route exact path="/dataFaq" component={this.DashboardContainer} />
                        <Route exact path="/dataFaq/create" component={this.DashboardContainer} />
                        <Route exact path="/dataFaq/edit/:id" component={this.DashboardContainer} />
                        <Route exact path="/login" component={this.LoginContainer} />
                        <Route component={this.DefaultContainer} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Routes
