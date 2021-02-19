import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getUsersRequest } from '../actions/users'
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';

class App extends Component {

  componentDidMount() {
    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {

  }

  render() {

    const { items } = this.props;

    if (!items) return;

    return (
      <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
        <NewUserForm onSubmit={this.handleSubmit} />
        <UsersList users={items} />
      </div>
    );
  }

}

const mapStateToProps = ({ users }) => {
  return users;
}

export default connect(mapStateToProps, { getUsersRequest })(App);
