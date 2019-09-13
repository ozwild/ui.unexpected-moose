import axios from 'axios';
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {
    Button,
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Label,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
} from 'semantic-ui-react';


export default function IndexList(props) {
    const {title, list} = props;
    return (
        <div>
            <Segment>
                <Container>
                    <Header as="h1">{title}</Header>
                    <Button circular as={Link} icon={"add"} to={'/create'} float={'right'}/>
                    <List component="nav" aria-label="Assets">

                        {list.map(item => (
                            <List.Item key={item.id}>
                                <List.Content floated={"right"}>
                                    <Button as={Link} to={`/${item.id}`}>Show</Button>
                                </List.Content>
                                <List.Content>
                                    <Link to={`/${item.id}`} style={{position: "relative"}}>
                                        {item.name}
                                        <Label color='red' floating>
                                            {item.requests_count}
                                        </Label>
                                    </Link>
                                </List.Content>
                            </List.Item>

                        ))}

                    </List>
                </Container>
            </Segment>
        </div>
    );

}
