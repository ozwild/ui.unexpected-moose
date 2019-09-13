import axios from 'axios';
import React, {Component} from 'react';
import {Button, Container, Header, Label, List, Segment, Icon, Divider, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

const styles = {
    listItem: {
        paddingTop: "1.5em", paddingBottom: "1.5em"
    }
};

class BookingsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: []
        };
    }

    componentDidMount() {
        axios.get('api/bookings')
            .then(response => {
                this.setState({
                    bookings: response.data
                })
            });
    }

    render() {
        const {bookings} = this.state;
        return (
            <div>
                <Container>
                    <Segment>

                        <Header as="h1">Bookings</Header>
                        <Button circular as={Link} icon={"add"} to={'/bookings/create'} floated={'right'}/>

                        <Divider clearing/>

                        <List divided relaxed aria-label="Boookings">

                            {bookings.map(item => (
                                <List.Item key={item.id} style={styles.listItem}>
                                    <List.Content>

                                        <List.Header as={Link} to={`/${item.id}`}>
                                            {item.name}
                                        </List.Header>
                                        <List.Description>

                                            <div>
                                                <Image avatar src={item.user.avatar} alt={"User's avatar"}/>
                                                <span>{item.user.name} ({item.user.email})</span>
                                            </div>
                                            <div>{`From: ${item.from} To: ${item.to}`}</div>
                                            <div>

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

export default BookingsIndex;