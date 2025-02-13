import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Search } from './components/Search';
import { Details } from './components/Details';
import { List } from './components/List';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    render() {
        let user;
    return (
      <Layout>
        <Route exact path="/" component={Home} />
            <AuthorizeRoute path="/search" component={Search} />
            <AuthorizeRoute path="/details/:id" component={Details} />
            <AuthorizeRoute path='/list' component={List} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
