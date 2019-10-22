import React from 'react';
import {
    Image,
    Grid,
    Header,
    Container,
    Table,
    Dimmer, Loader, Comment
} from "semantic-ui-react";
import useModelProvider from "../../../Hooks/useModelProvider";
import AssetService from "../../../Services/ModelServices/AssetService";
import PaginatedTable from "../../PaginatedTable";
import {Link} from "react-router-dom";
import CommentControl from "../../CommentControl";

const AssetShow = (props) => {
    const {match} = props;
    const {assetId} = match.params;
    const [asset, isLoading] = useModelProvider(AssetService, assetId);

    return (
        <>
            <Container text>

                <Dimmer.Dimmable dimmed={isLoading}>
                    <Dimmer active={isLoading} inverted>
                        <Loader size='large' content={"Loading"}/>
                    </Dimmer>

                    <Grid divided>
                        <Grid.Column width={6}>
                            <Image src={asset.picture} rounded/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as={"h2"}>{asset.name}</Header>
                            <p>{asset.description}</p>
                        </Grid.Column>
                    </Grid>

                </Dimmer.Dimmable>

                <br/><br/><br/>

                <div>
                    <Header as='h3' dividing content={"Booking Requests"}/>
                    {
                        {
                            false: <Header as='h4'  content={"No pending requests"}/>,
                            true: (
                                <>
                                    <PaginatedTable
                                        pageKey={"rp"}
                                        dataProvider={(page) => asset.getRequests(page)}
                                        headers={['Request Id', 'Requested By', 'From', 'To', 'Requested on']}
                                        rowTemplate={request => (
                                            <Table.Row key={request.id}>
                                                <Table.Cell>
                                                    <Link to={`/requests/${request.id}`}>
                                                        {request.id}
                                                    </Link>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Link to={`/users/${request.user.id}`}>{request.user.name}</Link>
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
                        }[asset.requests_count > 0]
                    }
                </div>

                <br/><br/><br/>

                <div>
                    <Header as='h3' dividing content={"Bookings"}/>
                    {
                        {
                            false: <Header as='h4' content={"No bookings registered for this asset"}/>,
                            true: (
                                <>
                                    <PaginatedTable
                                        pageKey={"rp"}
                                        dataProvider={(page) => asset.getBookings(page)}
                                        headers={['Request Id', 'Requested By', 'From', 'To', 'Requested on']}
                                        rowTemplate={booking => (
                                            <Table.Row key={booking.id}>
                                                <Table.Cell>
                                                    <Link to={`/bookings/${booking.id}`}>
                                                        {booking.id}
                                                    </Link>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Link to={`/users/${booking.user.id}`}>{booking.user.name}</Link>
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
                        }[asset.bookings_count > 0]
                    }
                </div>

                <br/><br/><br/>

                {asset.morph_class &&
                <>
                    <CommentControl
                        pageKey={"cp"}
                        dataProvider={(page) => asset.getComments(page)}
                    />
                </>
                }

            </Container>
        </>
    );

};

export default AssetShow;