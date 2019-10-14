import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Header, Button, Divider, Icon, Table, Pagination, Responsive, Segment, Message, Form} from "semantic-ui-react";
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import ModelService from "../Services/ModelServices/ModelService";

const queryString = require('query-string');

const CRUDIndexTable = (props) => {

    const {title, headers, service, createOptions, rowTemplate, refreshCounter, history} = props;
    const location = queryString.parse(props.location.search);
    const requestedPage = location.page ? location.page : 1;

    const [data, setData] = useState([]);
    const [dataError, setDataError] = useState(null);
    const [status, setStatus] = useState(null);
    const [activePage, setActivePage] = useState(requestedPage);
    const [totalPages, setTotalPages] = useState(1);

    if (requestedPage !== activePage) {
        setActivePage(requestedPage);
    }

    useEffect(() => {
        setStatus("loading");
        service.all(activePage)
            .then(response => {
                setData(response.data);
                setTotalPages(response.last_page);
                setStatus("ready");
            })
            .catch(errors => {
                const {response} = errors;
                setDataError(response.statusText);
                setStatus("error");
            });
    }, [activePage, refreshCounter]);

    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
        history.push(`${service.prefix}?page=${pageInfo.activePage}`);
    };

    return (
        <Segment basic
                 {...(status === "loading" && {loading: true})}>
            <Table celled compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={headers.length}>
                            {title &&
                            <Header as={"h1"}>{title}</Header>
                            }
                            {createOptions &&
                            <Link to={createOptions.route}>
                                <Button
                                    icon primary
                                    floated='right'
                                    labelPosition='left'
                                    size='small'
                                >
                                    <Icon name={createOptions.icon}/> {createOptions.title}
                                </Button>
                            </Link>
                            }
                            <Divider hidden clearing/>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        {headers.map((header, index) => {
                            if (Array.isArray(header)) {
                                return (
                                    <Responsive key={index} as={Table.HeaderCell} minWidth={header[1]}>
                                        {header[0]}
                                    </Responsive>
                                );
                            }
                            return (
                                <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
                            );
                        })}
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    {rowTemplate && data.map(datum => rowTemplate(datum))}

                </Table.Body>
                <Table.Footer>

                    <Table.Row>
                        <Table.HeaderCell colSpan={headers.length} textAlign={"right"}>
                            <Pagination
                                activePage={activePage}
                                onPageChange={onChange}
                                totalPages={totalPages}
                                ellipsisItem={null}
                                pointing
                                secondary
                            />
                        </Table.HeaderCell>
                    </Table.Row>

                </Table.Footer>
            </Table>

            {dataError &&
            <Message
                error
                header="Error!"
                content={`Server responded with: "${dataError}"`}
            />
            }
        </Segment>
    );
};

CRUDIndexTable.defaultProps = {
    title: null,
    headers: [],
    service: null,
    createOptions: null,
    rowTemplate: [],
    refreshCounter: 0
};

CRUDIndexTable.propTypes = {
    title: PropTypes.string,
    headers: PropTypes.array,
    service: PropTypes.instanceOf(ModelService).isRequired,
    createOptions: PropTypes.object,
    rowTemplate: PropTypes.func.isRequired,
    refreshCounter: PropTypes.number
};

export default withRouter(CRUDIndexTable);