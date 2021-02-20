import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getUsersRequest, createUserRequst, deleteUserReqeust, usersError } from '../actions/users'
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';
import { Alert } from 'reactstrap';

class App extends Component {

  componentDidMount() {
    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {
    this.props.createUserRequst({
      firstName,
      lastName
    });
  }

  handleDeleteUserClick = (userId) => {
    this.props.deleteUserReqeust({
      userId
    });
  }

  handleCloseAlert = () => {
    this.props.usersError({
      error: ''
    });
  }

  render() {

    const { items, error } = this.props;

    if (!items) return;

    return (
      <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>

        <Alert color="danger" isOpen={!!error} toggle={this.handleCloseAlert}>
          {error}
        </Alert>


        <NewUserForm onSubmit={this.handleSubmit} />
        <UsersList users={items} onDeleteUser={this.handleDeleteUserClick} />
      </div>
    );
  }

}

const mapStateToProps = ({ users }) => {
  return users;
}

export default connect(mapStateToProps, {
  getUsersRequest,
  createUserRequst,
  deleteUserReqeust,
  usersError
})(App);
