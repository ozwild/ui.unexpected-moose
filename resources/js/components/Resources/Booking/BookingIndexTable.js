import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Message, Table} from "semantic-ui-react";
import CRUDIndexTable from "../../CRUDIndexTable";
import BookingService from "../../../Services/ModelServices/BookingService";

const BookingIndexTable = (props) => {
    const service = BookingService;
    const [status, setStatus] = useState("");
    const [refreshCounter, setRefreshCounter] = useState(0);

    const headers = ["Asset", "Requested By", "Time Frame", "Options"];

    const deleteResource = (resource) => {
        service.delete(resource)
            .then(() => {
                setRefreshCounter(refreshCounter + 1);
                setStatus("deleted");
                scheduleMessageDismissal();
            });
    };

    const scheduleMessageDismissal = () => {
        setTimeout(() => dismissMessages(), 5000);
    };

    const dismissMessages = () => {
        setStatus("");
    };

    const rowTemplate = booking => (
        <Table.Row key={booking.id}>
            <Table.Cell>
                <Link to={`/assets/${booking.asset.id}`}>{booking.asset.name}</Link>
            </Table.Cell>
            <Table.Cell>
                <Link to={`/users/${booking.user.id}`}>{booking.user.name}</Link>
            </Table.Cell>
            <Table.Cell>
                <div>{`From: ${booking.from}`}</div>
                <div>{`To: ${booking.to}`}</div>
            </Table.Cell>
            <Table.Cell>
                <Button.Group icon>
                    <Link to={`/bookings/${booking.id}/edit`}><Button icon={'edit'}/></Link>
                    <Button icon={'trash'} onClick={() => deleteResource(booking)}/>
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
    return (
        <>
            <CRUDIndexTable
                title={"Bookings"}
                createOptions={{icon: "book", route: "/requests/create", title: "New Request"}}
                headers={headers}
                rowTemplate={rowTemplate}
                service={service}
                refreshCounter={refreshCounter}
            />
            {status === "deleted" &&
            <Message info
                     onDismiss={dismissMessages}
                     icon={"trash"}
                     header={"Booking Deleted!"}
                     content={<span>A booking has been deleted</span>}
            />
            }
        </>
    );
};

export default BookingIndexTable;