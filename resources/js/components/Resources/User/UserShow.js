import React from 'react';
import {
    Image,
    Grid,
    Header,
    Container,
    Table,
    Dimmer, Loader
} from "semantic-ui-react";
import useModelProvider from "../../../Hooks/useModelProvider";
import PaginatedTable from "../../PaginatedTable";
import {Link} from "react-router-dom";
import UserService from "../../../Services/ModelServices/UserService";

const UserShow = (props) => {
    const {match} = props;
    const {userId} = match.params;
    const [user, isLoading] = useModelProvider(UserService, userId);

    return (
        <>
            <Container text>

                <Dimmer.Dimmable dimmed={isLoading}>

                    <Dimmer active={isLoading} inverted>
                        <Loader size='large' content={"Loading"}/>
                    </Dimmer>

                    <Grid divided>
                        <Grid.Column width={6}>
                            <Image src={user.avatar} rounded/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as={"h2"}>{user.name}</Header>
                            <p>{user.email} | {user.phone}</p>
                        </Grid.Column>
                    </Grid>

                </Dimmer.Dimmable>

                <br/><br/><br/>

                <div>
                    <Header as={"h2"}>Pending Requests</Header>
                    {
                        {
                            false: <h3>No pending requests for this user</h3>,
                            true: (
                                <>
                                    <PaginatedTable
                                        pageKey={"rp"}
                                        dataProvider={(page) => user.getRequests(page)}
                                        headers={['Request Id', 'Requested Asset', 'From', 'To', 'Requested on']}
                                        rowTemplate={request => (
                                            <Table.Row key={request.id}>
                                                <Table.Cell>
                                                    <Link to={`/requests/${request.id}`}>
                                                        {request.id}
                                                    </Link>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Link to={`/assets/${request.asset.id}`}>{request.asset.name}</Link>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {request.from}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {request.to}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {request.created_at}
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    />
                                </>
                            )
                        }[user.requests_count > 0]
                    }
                </div>

                <br/><br/><br/>

                <div>
                    <Header as={"h2"}>Bookings</Header>
                    {
                        {
                            false: <h3>No bookings registered for this user</h3>,
                            true: (
                                <>
                                    <PaginatedTable
                                        pageKey={"bp"}
                                        dataProvider={(page) => user.getBookings(page)}
                                        headers={['Booking Id', 'Requested Asset', 'From', 'To', 'Requested on']}
                                        rowTemplate={booking => (
                                            <Table.Row key={booking.id}>
                                                <Table.Cell>
                                                    <Link to={`/bookings/${booking.id}`}>
                                                        {booking.id}
                                                    </Link>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Link
                                                        to={`/assets/${booking.asset.id}`}>{booking.asset.name}</Link>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {booking.from}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {booking.to}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {booking.created_at}
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    />
                                </>
                            )
                        }[user.bookings_count > 0]
                    }
                </div>

            </Container>
        </>
    );

};

export default UserShow;