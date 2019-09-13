import axios from 'axios';
import React, {Component} from 'react';
import {Button, Container, Header, Label, List, Segment, Image, Divider} from "semantic-ui-react";
import {Link} from "react-router-dom";

const styles = {
    listItem: {
        paddingTop: "1.5em", paddingBottom: "1.5em"
    }
};

class RequestsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        };
    }

    componentDidMount() {
        axios.get('api/requests')
            .then(response => {
                this.setState({
                    requests: response.data
                })
            });
    }

    render() {
        const {requests} = this.state;
        return (
            <div>
                <Container>
                    <Segment>

                        <Header as="h1">Requests</Header>
                        <Button circular as={Link} icon={"add"} to={'/create'} floated={'right'}/>

                        <Divider clearing/>

                        <List divided relaxed aria-label="Assets">

                            {requests.map(item => (
                                <List.Item key={item.id} style={styles.listItem}>
                                    <List.Content>

                                        <List.Header as={Link} to={`/${item.id}`}>
                                            {item.asset.name}
                                        </List.Header>
                                        <List.Description>

                                            <div>
                                                <Image avatar src={item.user.avatar} alt={"User's avatar"}/>
                                                <span>{item.user.name} ({item.user.email})</span>
                                            </div>
                                            <div>{`From: ${item.from} To: ${item.to}`}</div>
                                            <div>
                                                {item.is_pending && <Label color={"yellow"}>
                                                    Pending
                                                </Label>}
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

export default RequestsIndex;