import useFetch from "hooks/useFetch";
import useBuildFetchUrl from "hooks/useBuildFetchUrl";
import useParams from "hooks/useParams";
import { useStore } from "@nanostores/react";
import { globalStore } from "store/globalStore";

const Bars = () => {
    const { configuration, labels } = useStore(globalStore);
    const { competition, valueType } = useParams();

    const { data, loading } = useFetch(useBuildFetchUrl());

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!data) {
        return null;
    }

    return (
        <div>
            <h1>Bars {competition}</h1>
            {valueType === "seats" ? <div>Seats</div> : <div>Percent</div>}
            <pre>
                <h2>Data</h2>
                {JSON.stringify(data, null, 2)}
            </pre>
            <pre>
                <h2>Config</h2>
                {JSON.stringify(configuration, null, 2)}
            </pre>
            <pre>
                <h2>Labels</h2>
                {labels}
            </pre>
        </div>
    );
};

export default Bars;
