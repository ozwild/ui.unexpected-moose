import axios from 'axios';
import React, {Component} from 'react';
import {Button, Container, Header, Label, List, Segment, Icon, Divider} from "semantic-ui-react";
import {Link} from "react-router-dom";

const styles = {
    listItem: {
        paddingTop: "1.5em", paddingBottom: "1.5em"
    }
};

class AssetsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: []
        };
    }

    componentDidMount() {
        axios.get('api/assets')
            .then(response => {
                this.setState({
                    assets: response.data
                })
            });
    }

    render() {
        const {assets} = this.state;
        return (
            <div>
                <Container>
                    <Segment>

                        <Header as="h1">Assets</Header>
                        <Button circular as={Link} icon={"add"} to={'/create'} floated={'right'}/>

                        <Divider clearing/>

                        <List divided relaxed aria-label="Assets">

                            {assets.map(item => (
                                <List.Item key={item.id} style={styles.listItem}>
                                    <List.Content>

                                        <List.Header as={Link} to={`/${item.id}`}>
                                            {item.name}
                                        </List.Header>
                                        <List.Description>

                                            {item.description}
                                            <br/><br/>
                                            <Label color={item.requests_count > 0 ? "yellow" : "grey"}>Pending
                                                Requests: {item.requests_count} </Label>

                                            {item.comments.map(comment => (
                                                <div key={comment.id}>
                                                    <blockquote>{comment.body}</blockquote>
                                                    <br/>
                                                </div>
                                            ))}

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

export default AssetsIndex;