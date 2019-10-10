import React, {useState, useEffect} from 'react';

const useModelProvider = (provider, initialId) => {
    const [model, setModel] = useState(provider.build());
    const [id, setId] = useState(initialId);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await provider.get(id);
                setModel(result);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        fetchData();

        return function cleanup() {

        }
    }, [id]);

    return [{model, isLoading, isError}, setId];
};

export default useModelProvider;