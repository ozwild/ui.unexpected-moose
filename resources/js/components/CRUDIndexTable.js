import React from 'react';
import PropTypes from 'prop-types';
import PaginatedTable from "./PaginatedTable";

const CRUDIndexTable = (props) => {
    const {service, ...otherProps} = props;
    const getData = page => service.all(page);
    const route = service.prefix;

    return (
        <PaginatedTable dataProvider={getData} route={route} {...otherProps} />
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
    service: PropTypes.func.isRequired,
    createOptions: PropTypes.object,
    rowTemplate: PropTypes.func.isRequired,
    refreshCounter: PropTypes.number
};

export default CRUDIndexTable;