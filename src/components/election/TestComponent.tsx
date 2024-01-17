import useFetch from "hooks/useFetch";
import useBuildFetchUrl from "hooks/useBuildFetchUrl";
import useLabels from "hooks/useLabels";
import useConfig from "hooks/useConfig";

const TestComponent = () => {
    const { data, loading } = useFetch(useBuildFetchUrl());

    const labels = useLabels();

    const config = useConfig();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!data) {
        return null;
    }

    return (
        <div>
            <h1>TestComponent</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default TestComponent;
