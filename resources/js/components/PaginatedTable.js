import React from 'react';
import {Link} from "react-router-dom";
import {
    Header,
    Dimmer,
    Button,
    Divider,
    Icon,
    Table,
    Pagination,
    Responsive,
    Segment,
    Message,
    Loader
} from "semantic-ui-react";
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import usePagination from "../Hooks/usePagination";

const PaginatedTable = (props) => {

    const {title, headers, dataProvider, createOptions, rowTemplate, refreshCounter, history, location, pageKey} = props;

    const {data, status, pageChangeHandler, activePage, totalPages, dataError} = usePagination({
        refreshCounter,
        history,
        getData: dataProvider,
        location,
        pageKey
    });

    const isLoading = status === "loading";

    return (
        <Dimmer.Dimmable dimmed={isLoading}>
            <Dimmer active={isLoading} inverted>
                <Loader size='large' content={"Loading"}/>
            </Dimmer>
            <Table basic={"very"} compact>

                <Table.Header>

                    {(title || createOptions) &&
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
                    }

                    {headers.length > 0 &&
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
                    }

                </Table.Header>
                <Table.Body>

                    {rowTemplate && data.map(datum => rowTemplate(datum))}

                </Table.Body>
                <Table.Footer>

                    <Table.Row>
                        <Table.HeaderCell colSpan={headers.length} textAlign={"right"}>
                            <Pagination
                                activePage={activePage}
                                onPageChange={pageChangeHandler}
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
        </Dimmer.Dimmable>
    );
};


PaginatedTable.defaultProps = {
    title: null,
    headers: [],
    dataProvider: null,
    createOptions: null,
    rowTemplate: [],
    pageKey: 'page',
    refreshCounter: 0
};

PaginatedTable.propTypes = {
    title: PropTypes.string,
    headers: PropTypes.array,
    dataProvider: PropTypes.func.isRequired,
    createOptions: PropTypes.object,
    rowTemplate: PropTypes.func.isRequired,
    pageKey: PropTypes.string,
    refreshCounter: PropTypes.number
};

export default withRouter(PaginatedTable);