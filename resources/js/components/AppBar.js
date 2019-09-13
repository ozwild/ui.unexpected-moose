import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
} from 'semantic-ui-react'

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '1em',
    marginTop: '4em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};


class PrimarySearchAppBar extends Component {

    state = {
        menuFixed: false,
        overlayFixed: false,
    };

    handleOverlayRef = (c) => {
        const {overlayRect} = this.state;
        const {height, width} = c.getBoundingClientRect();

        if (!overlayRect) {
            this.setState({overlayRect: {height, width}})
        }
    };

    stickOverlay = () => this.setState({overlayFixed: true});

    stickTopMenu = () => this.setState({menuFixed: true});

    unStickOverlay = () => this.setState({overlayFixed: false});

    unStickTopMenu = () => this.setState({menuFixed: false});

    render() {
        const {menuFixed, overlayFixed, overlayRect} = this.state;
        return (
            <Visibility
                onBottomPassed={this.stickTopMenu}
                onBottomVisible={this.unStickTopMenu}
                once={false}
            >
                <Menu
                    borderless
                    fixed={menuFixed ? 'top' : undefined}
                    style={menuFixed ? fixedMenuStyle : menuStyle}
                >
                    <Container text>
                        <Menu.Item>
                            <Image size='mini' src='/logo-placeholder.png'/>
                        </Menu.Item>
                        <Menu.Item header>Unexpected-Moose</Menu.Item>
                        <Menu.Item as={Link} to="/assets">Assets</Menu.Item>
                        <Menu.Item as={Link} to="/requests">Requests</Menu.Item>
                        <Menu.Item as={Link} to="/bookings">Bookings</Menu.Item>
                        <Menu.Item as={Link} to="/users">Users</Menu.Item>

                        <Menu.Menu position='right'>
                            <Dropdown text='Options' pointing className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Header>Header Item</Dropdown.Header>
                                    <Dropdown.Item>
                                        <i className='dropdown icon'/>
                                        <span className='text'>Submenu</span>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>List Item</Dropdown.Item>
                                            <Dropdown.Item>List Item</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </Visibility>
        );
    }

}

export default PrimarySearchAppBar;