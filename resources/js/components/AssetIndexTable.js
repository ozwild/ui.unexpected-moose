import React, {useState} from 'react';
import {Table, Image, Button, Message} from "semantic-ui-react";
import CRUDIndexTable from "./CRUDIndexTable";
import {Link} from "react-router-dom";
import AssetService from "../Services/AssetService";

const AssetIndexTable = ({data}) => {

    const service = AssetService;
    const [status, setStatus] = useState("");
    const [deletedResource, setDeletedResource] = useState(null);
    const [refreshCounter, setRefreshCounter] = useState(0);

    const headers = ["Name", "Description", "Pending Requests", "Options"];

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

    const rowTemplate = asset => (
        <Table.Row key={asset.id}>
            <Table.Cell>
                <Link to={`/assets/${asset.id}`}>{asset.name}</Link>
            </Table.Cell>
            <Table.Cell>{asset.description}</Table.Cell>
            <Table.Cell>{asset.requests_count}</Table.Cell>
            <Table.Cell>
                <Button.Group icon>
                    <Link to={`/assets/${asset.id}/edit`}><Button icon={'edit'}/></Link>
                    <Button icon={'trash'} onClick={() => deleteResource(user)}/>
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
    return (
        <>
            <CRUDIndexTable
                title={"Assets"}
                createOptions={{icon: "boxes", route: "/assets/create", title: "Create Asset"}}
                headers={headers}
                rowTemplate={rowTemplate}
                service={service}
                refreshCounter={refreshCounter}
            />
            {status === "deleted" &&
            <Message info
                     onDismiss={dismissMessages}
                     icon={"trash"}
                     header={"Asset Deleted!"}
                     content={<span>An asset has been deleted.
                         <a href={"#"} onClick={() => undoDeletion()}>Undo?</a></span>}
            />
            }
            {status === "restored" &&
            <Message success
                     icon={"redo"}
                     header={"Asset Restored!"}/>
            }
        </>
    );
};

export default AssetIndexTable;