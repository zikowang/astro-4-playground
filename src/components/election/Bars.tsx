import { useStore } from "@nanostores/react";
import { $globalStore } from "store/globalStore";

const Bars = () => {
    const { config, labels, params, data, dataLoading } =
        useStore($globalStore);

    if (dataLoading) {
        return <h1>Loading...</h1>;
    }

    if (!data) {
        return null;
    }

    return (
        <div>
            <h3>Bars Widget {params.competition}</h3>
            {params.valueType === "seats" ? (
                <div>Seats</div>
            ) : (
                <div>Percent</div>
            )}
            <pre>
                <h4>Data</h4>
                {JSON.stringify(data, null, 2)}
            </pre>
            <pre>
                <h4>Config</h4>
                {JSON.stringify(config, null, 2)}
            </pre>
            <pre>
                <h4>Labels</h4>
                {labels}
            </pre>
        </div>
    );
};

export default Bars;
