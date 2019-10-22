import React, {useState, useEffect} from 'react';

const queryString = require('query-string');

const usePagination = ({location, getData, history, route, refreshCounter = 0, pageKey = 'page'}) => {

    const query = queryString.parse(location.search);
    const requestedPage = query[pageKey] ? query[pageKey] : 1;

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
        getData(activePage)
            .then(response => {
                setData(response.data);
                setTotalPages(response.last_page || 1);
                setStatus("ready");
            })
            .catch(errors => {
                const {response} = errors;
                console.error(response);
                setDataError(response.statusText);
                setStatus("error");
            });
    }, [activePage, refreshCounter]);

    const pageChangeHandler = (e, pageInfo) => {
        const newPage = pageInfo.activePage;
        const newQuery = Object.assign({}, query);
        newQuery[pageKey] = newPage;
        history.push(`${location.pathname}?${queryString.stringify(newQuery)}`);
        /*setActivePage(newPage);*/
    };

    return {
        data,
        status,
        dataError,
        activePage,
        totalPages,
        pageChangeHandler
    };

};

export default usePagination;