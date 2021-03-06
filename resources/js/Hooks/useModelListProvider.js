import React, {useState, useEffect} from 'react';

const useModelListProvider = (provider) => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await provider.list();
                setList(result.map(datum => provider.build(datum)));
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        fetchData();

        return function cleanup() {

        }
    }, []);

    return [list, isLoading, isError];
};

export default useModelListProvider;