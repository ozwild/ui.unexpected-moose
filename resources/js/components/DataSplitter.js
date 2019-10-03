import React from 'react';

const DataSplitter = ({data, children}) => {
    return (
        data.map(datum => children(datum))
    );
};

export default DataSplitter;