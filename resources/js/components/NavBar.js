import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, Menu, Visibility, Dropdown} from 'semantic-ui-react'
import {useAuth} from "../Contexts/AuthContext";

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    paddingBottom: '2em',
    paddingTop: '1em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};


const NavBar = () => {
    const [menuFixed, setMenuFixed] = useState(false);
    const [overlayFixed, setOverlayFixed] = useState(false);
    const [overlayRect, setOverlayRect] = useState(false);

    const handleOverlayRef = (c) => {
        const {height, width} = c.getBoundingClientRect();
        if (!overlayRect) {
            setOverlayRect({height, width});
        }
    };
    const stickOverlay = () => setOverlayFixed(true);

    const stickTopMenu = () => setMenuFixed(true);

    const unStickOverlay = () => setOverlayFixed(false);

    const unStickTopMenu = () => setMenuFixed(false);

    const {login, logout, user} = useAuth();

    const userOptions = () => {
        if (user) {
            return (
                <Dropdown text={user.name} pointing className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item> <Link to={'/'} onClick={() => logout()}> Logout</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
        }

        return (
            <>
                <Menu.Item as={Link} to="/login">Login</Menu.Item>
            </>
        )

    };

    return (
        <Visibility
            onBottomPassed={stickTopMenu}
            onBottomVisible={unStickTopMenu}
            once={false}
        >
            <Menu
                borderless
                fixed={menuFixed ? 'top' : undefined}
                style={menuFixed ? fixedMenuStyle : menuStyle}
            >
                <Container text>
                    {/*<Menu.Item>
                            <Image size='mini' src='/logo-placeholder.png'/>
                        </Menu.Item>*/}
                    <Menu.Item header as={Link} to={"/"}>Unexpected Moose</Menu.Item>
                    <Menu.Item as={Link} to="/assets">Assets</Menu.Item>
                    <Menu.Item as={Link} to="/requests">Requests</Menu.Item>
                    <Menu.Item as={Link} to="/bookings">Bookings</Menu.Item>
                    <Menu.Item as={Link} to="/users">Users</Menu.Item>

                    <Menu.Menu position='right'>
                        {userOptions()}
                    </Menu.Menu>
                </Container>
            </Menu>
        </Visibility>
    );

};

export default NavBar;
