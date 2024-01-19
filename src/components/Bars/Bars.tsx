import { useStore } from "@nanostores/react";

import { PUBLIC_ELECTIONS_LIVE_S3 } from "constants/env";
import { $globalStore } from "store/globalStore";

type ResultEntry = {
    id: string;
    party: string;
    seats?: number;
    percent?: number;
    absolute?: number | string;
    date_out: string;
};

// type ResultData = {
//     type: number;
//     statusDate: string;
//     sourceResults: string;
//     sourceName: string;
//     sourceFinalName?: string;
//     seats?: number;
//     totalSeats?: number;
//     totalAbsolute?: number;
//     percentCounted?: string;
//     percentTurnout?: string;
//     results: ResultEntry[];
// };

// type ResultResponse = {
//     results: ResultData[];
// };

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

            <table>
                <tbody>
                    {data.results[0].results.map((result: ResultEntry) => {
                        const oldResult = data.results[1]?.results?.find(
                            (elem: ResultEntry) => elem.id === result.id,
                        );

                        return (
                            <tr key={result.id}>
                                <td>
                                    {result.party ? (
                                        <img
                                            src={`${PUBLIC_ELECTIONS_LIVE_S3}/${params.competition}/img/${params.season}/${result.party}/${result.id}.png`}
                                            alt={`${result.id}`}
                                        />
                                    ) : (
                                        <img
                                            src={`${PUBLIC_ELECTIONS_LIVE_S3}/${params.competition}/img/${params.season}/${result.id}/${result.id}.png`}
                                            alt={`${result.id}`}
                                        />
                                    )}
                                </td>
                                <td>
                                    Seats: {result.seats}{" "}
                                    {oldResult?.seats
                                        ? `(${oldResult.seats})`
                                        : ""}
                                </td>
                                <td>
                                    Percent: {result.percent}{" "}
                                    {oldResult?.perccent
                                        ? `(${oldResult.percent})`
                                        : ""}
                                </td>
                                <td>
                                    Absolute: {result.absolute}{" "}
                                    {oldResult?.absolute
                                        ? `(${oldResult.absolute})`
                                        : ""}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

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
                {typeof labels === "string"
                    ? labels
                    : JSON.stringify(labels, null, 2)}
            </pre>
        </div>
    );
};

export default Bars;
