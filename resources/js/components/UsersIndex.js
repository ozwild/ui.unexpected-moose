import axios from 'axios';
import React, {Component} from 'react';
import {Button, Container, Header, Label, List, Segment, Icon, Divider, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

const styles = {
    listItem: {
        paddingTop: "1.5em", paddingBottom: "1.5em"
    }
};

class UsersIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get('api/users')
            .then(response => {
                this.setState({
                    users: response.data
                })
            });
    }

    render() {
        const {users} = this.state;
        return (
            <div>
                <Container>
                    <Segment>

                        <Header as="h1">Users</Header>
                        <Button circular as={Link} icon={"add"} to={'/users/create'} floated={'right'}/>

                        <Divider clearing/>

                        <List divided relaxed aria-label="Users">

                            {users.map(item => (
                                <List.Item key={item.id} style={styles.listItem}>
                                    <List.Content>

                                        <List.Header as={Link} to={`/users/${item.id}`}>
                                            <Image avatar src={item.avatar} alt={"User's avatar"}/>
                                            <span>{item.name}</span>
                                        </List.Header>
                                        <List.Description>
                                            <div><a href={`mailto:${item.email}`}>{item.email}</a></div>
                                            <div>
                                                <Label color={item.requests_count > 0 ? "yellow" : "grey"}>Pending
                                                    Requests: {item.requests_count} </Label>
                                            </div>
                                            <div>
                                                {item.comments.map(comment => (
                                                    <div key={comment.id}>
                                                        <blockquote>{comment.body}</blockquote>
                                                        <br/>
                                                    </div>
                                                ))}
                                            </div>

                                        </List.Description>

                                    </List.Content>
                                </List.Item>
                            ))}

                        </List>
                    </Segment>
                </Container>
            </div>
        );
    }

}

export default UsersIndex;