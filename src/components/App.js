import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getUsersRequest } from '../actions/users'

class App extends Component {

  componentDidMount() {
    this.props.getUsersRequest();
  }

  render() {
    return (
      <div>Test</div>
    );
  }

}

const mapStateToProps = ({ users }) => {
  return users;
}

export default connect(mapStateToProps, { getUsersRequest })(App);
