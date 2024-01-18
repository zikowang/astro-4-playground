import { useStore } from "@nanostores/react";
import { $globalStore } from "store/globalStore";

type ResultEntry = {
    id: string;
    party: string;
    seats?: number;
    percent?: number;
    absolute?: number | string;
    date_out: string;
};

type ResultData = {
    type: number;
    statusDate: string;
    sourceResults: string;
    sourceName: string;
    sourceFinalName?: string;
    seats?: number;
    totalSeats?: number;
    totalAbsolute?: number;
    percentCounted?: string;
    percentTurnout?: string;
    results: ResultEntry[];
};

type ResultResponse = {
    results: ResultData[];
};

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
            {params.valueType === "seats" ? <h3>Seats</h3> : <h3>Percent</h3>}

            <div>
                {data.results.map((item: ResultData) => (
                    <div key={item.sourceResults}>
                        {item.sourceName} - {item.statusDate}
                        <div>
                            {item.results.map((result: ResultEntry) => (
                                <div key={result.id}>
                                    {result.party ?? result.id} - {result.seats}{" "}
                                    - {result.percent} - {result.absolute}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* <pre>
                <h4>Data</h4>
                {JSON.stringify(data, null, 2)}
            </pre> */}
            {/* <pre>
                <h4>Config</h4>
                {JSON.stringify(config, null, 2)}
            </pre> */}
            <pre>
                <h4>Labels</h4>
                {labels}
            </pre>
        </div>
    );
};

export default Bars;
