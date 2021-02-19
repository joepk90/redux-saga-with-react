import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap'

const sortNames = (a, b) => {

    if (a.firstName > b.firstName) return 1;
    else if (a.firstName < b.firstName) return -1;
    else if (a.lastName > b.lastName) return 1;
    else if (a.lastName < b.lastName) return -1;
    return 0;
}

const UsersList = ({ users }) => {
    return (
        <ListGroup>
            {users.sort(sortNames).map(user => {
                return <ListGroupItem key={user.id}>
                    <section style={{ display: 'flex', margin: 'auto 0' }}>
                        <div style={{ flexGrow: 1 }}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div>
                            <Button outline color='danger'>Delete</Button>
                        </div>
                    </section>
                </ListGroupItem>
            })}
        </ListGroup>
    );
}

export default UsersList;