import React, {Component} from 'react';
import {Link} from "react-router-dom";
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
} from 'semantic-ui-react';

const CollisionLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} to="/getting-started/installation/" {...props} />
));

export default CollisionLink;