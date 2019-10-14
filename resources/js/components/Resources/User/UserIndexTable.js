import React, {useState} from 'react';
import {Table, Button, Message} from "semantic-ui-react";
import CRUDIndexTable from "../../CRUDIndexTable";
import {Link} from "react-router-dom";
import UserService from "../../../Services/ModelServices/UserService";

const UserIndexTable = (props) => {
    const service = new UserService();
    const [status, setStatus] = useState("");
    const [deletedResource, setDeletedResource] = useState(null);
    const [refreshCounter, setRefreshCounter] = useState(0);

    const headers = ["Name", "Email", "Phone", "Registration Date", "Options"];

    const deleteResource = (resource) => {
        service.delete(resource)
            .then(() => {
                setRefreshCounter(refreshCounter + 1);
                setDeletedResource(user);
                setStatus("deleted");
            });
    };

    const undoDeletion = () => {
        if (!deletedResource) return;
        service.restore(deletedResource)
            .then(() => {
                setRefreshCounter(refreshCounter + 1);
                setStatus("restored");
                scheduleMessageDismissal();
            })
    };

    const scheduleMessageDismissal = () => {
        setTimeout(() => dismissMessages(), 5000);
    };

    const dismissMessages = () => {
        setStatus("");
    };

    const rowTemplate = user => (
        <Table.Row key={user.id}>
            <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
            </Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.phone}</Table.Cell>
            <Table.Cell>{user.created_at}</Table.Cell>
            <Table.Cell>
                <Button.Group icon>
                    <Link to={`/users/${user.id}/edit`}><Button icon={'edit'}/></Link>
                    <Button icon={'trash'} onClick={() => deleteResource(user)}/>
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
    return (
        <>
            <CRUDIndexTable
                title={"Users"}
                createOptions={{icon: "user", route: "/users/create", title: "Create User"}}
                headers={headers}
                rowTemplate={rowTemplate}
                service={service}
                refreshCounter={refreshCounter}
            />
            {status === "deleted" &&
            <Message info
                     onDismiss={dismissMessages}
                     icon={"trash"}
                     header={"User Deleted!"}
                     content={<span>A user has been deleted.
                         <a href={"#"} onClick={() => undoDeletion()}>Undo?</a></span>}
            />
            }
            {status === "restored" &&
            <Message success
                     icon={"redo"}
                     header={"User Restored!"}/>
            }
        </>
    );
};

export default UserIndexTable;