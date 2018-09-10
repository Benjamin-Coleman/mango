import React, { Fragment } from 'react';
// import Helmet from 'react-helmet-async';
// import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
// import { routes } from './routes';
import styles from './App.css';
import classnames from 'classnames/bind';
import Meta from './AppMeta';
import RootContainer from './components/RootContainer/RootContainer';

// const cx = classnames.bind(styles);

const mapStateToProps = state => ({
});

const App = ({
}) => (
    <Fragment>
      {/* <Helmet>
        <body  />
      </Helmet> */}
      <div>
        <Meta />
        <RootContainer />
      </div>
    </Fragment>
  );

export default compose(
  withRouter,
  connect(mapStateToProps),
)(App);
