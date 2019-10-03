import React from 'react';
import {Table} from "semantic-ui-react";

const GenericTable = ({title, headers, data, rowTemplate}) => {
    return (
        <Table basic={'very'}>
            <Table.Header>
                {title &&
                <Table.Row>
                    <Table.HeaderCell colSpan={headers.length}>
                        title
                    </Table.HeaderCell>
                </Table.Row>}
                <Table.Row>
                    {headers.map((header, index) => <Table.HeaderCell key={index}>{header}</Table.HeaderCell>)}
                </Table.Row>
            </Table.Header>
            <Table.Body>

                {rowTemplate && data.map(datum => rowTemplate(datum))}

            </Table.Body>
        </Table>
    );
};

export default GenericTable;