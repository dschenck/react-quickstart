import React from 'react'
import ReactDOM from 'react-dom'
import { PublicRoute, AuthRoute } from './routing'
import { HashRouter as Router, Link, Route } from 'react-router-dom'

import './index.css'

import * as Layout from './Layout'
import * as Pages from './pages'
import modules from './modules'
import Session from './contexts/session'

class App extends React.Component {
    render() {
        return (
            <Session.Component>
                <modules.modals.Component />
                <modules.notifications.Component />
                <modules.prompts.Component />
                <Layout.Panel />
                <Router>
                    <Layout.Navbar />
                    <Layout.Main>
                        <Route path="/login" exact component={Pages.Authentication.Login} />
                        <Route path="/register" exact component={Pages.Registration.Register} />
                        <Route path="/resetting/request" exact component={Pages.Resetting.Request} />
                        <Route path="/resetting/reset" exact component={Pages.Resetting.Reset} />
                        <Route path="/resetting/sent" exact component={Pages.Resetting.Sent} />
                        <Route path="/dashboard" exact component={Pages.Dashboard.View} />
                        <Route path="/spreadsheet" exact component={Pages.Spreadsheet} />
                        <AuthRoute path="/" exact component={Pages.Home} />
                        <AuthRoute path="/layout" exact component={Pages.Layout} />
                        <AuthRoute path="/utilities" exact component={Pages.Utilities} />
                        <Route path="/tree" component={Pages.Tree} />
                        <Route path="/sandbox" component={Pages.Sandbox} />
                        <AuthRoute path="/contact" component={Pages.Contact} />
                    </Layout.Main>
                    <Layout.Footer />
                </Router>
            </Session.Component>
        )
    }
}

ReactDOM.render(
    <App />, document.getElementById("root")
)