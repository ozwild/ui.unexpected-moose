import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Message, Table} from "semantic-ui-react";
import CRUDIndexTable from "../../CRUDIndexTable";
import RequestService from "../../../Services/ModelServices/RequestService";

const RequestIndexTable = (props) => {
    const service = new RequestService();
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

    const rowTemplate = request => (
        <Table.Row key={request.id}>
            <Table.Cell>
                <Link to={`/assets/${request.asset.id}`}>{request.asset.name}</Link>
            </Table.Cell>
            <Table.Cell>
                <Link to={`/users/${request.user.id}`}>{request.user.name}</Link>
            </Table.Cell>
            <Table.Cell>
                <div>{`From: ${request.from}`}</div>
                <div>{`To: ${request.to}`}</div>
            </Table.Cell>
            <Table.Cell>
                <Button.Group icon>
                    <Link to={`/requests/${request.id}/edit`}><Button icon={'edit'}/></Link>
                    <Button icon={'trash'} onClick={() => deleteResource(request)}/>
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );

    return (
        <>
            <CRUDIndexTable
                title={"Requests"}
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
                     header={"Request Deleted!"}
                     content={<span>A request has been deleted</span>}
            />
            }
        </>
    );
};

export default RequestIndexTable;