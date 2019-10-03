import React, {useState, useEffect} from 'react';

const useModelProvider = (provider, initialId, initialModel) => {
    const [model, setModel] = useState(initialModel);
    const [id, setId] = useState(initialId);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await provider.get(id);
                setModel(result);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [id]);

    return [{model, isLoading, isError}, setId];
};

export default useModelProvider;