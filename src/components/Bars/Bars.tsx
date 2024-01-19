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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBars = (data: ResultResponse) => {
    if (!data) {
        return null;
    }

    const barsData = { ...data };

    barsData.results[0].results.sort((a: ResultEntry, b: ResultEntry) => {
        if (a.percent !== undefined && b.percent !== undefined) {
            return b.percent - a.percent;
        }

        if (a.seats !== undefined && b.seats !== undefined) {
            return b.seats - a.seats;
        }

        if (a.absolute !== undefined && b.absolute !== undefined) {
            return Number(b.absolute) - Number(a.absolute);
        }

        return 0;
    });

    return barsData;
};

const Bars = () => {
    const { config, labels, params, data, dataLoading } =
        useStore($globalStore);

    const barsData = useBars(data);

    if (dataLoading) {
        return <h1>Loading...</h1>;
    }

    if (!barsData) {
        return null;
    }

    const hasSeats = barsData.results[0].results.some(
        (result: ResultEntry) => !!result.seats,
    );
    const hasPercent = barsData.results[0].results.some(
        (result: ResultEntry) => !!result.percent,
    );
    const hasAbsolute = barsData.results[0].results.some(
        (result: ResultEntry) => !!result.absolute,
    );

    return (
        <div>
            <h3>Bars Widget {params.competition}</h3>
            {params.valueType === "seats" ? <h3>Seats</h3> : <h3>Percent</h3>}

            <table>
                <tbody>
                    {barsData.results[0].results.map((result: ResultEntry) => {
                        const oldResult = barsData.results[1]?.results?.find(
                            (elem: ResultEntry) => elem.id === result.id,
                        );

                        return (
                            <tr key={result.id}>
                                <td>
                                    {result.party ? (
                                        <div className="dpa_ranking">
                                            <img
                                                className="dpa_image"
                                                src={`${PUBLIC_ELECTIONS_LIVE_S3}/${params.competition}/img/${params.season}/${result.party}/${result.id}.png`}
                                                alt={`${result.id}`}
                                            />
                                        </div>
                                    ) : (
                                        <div className="dpa_ranking">
                                            <img
                                                className="dpa_image"
                                                src={`${PUBLIC_ELECTIONS_LIVE_S3}/${params.competition}/img/${params.season}/${result.id}/${result.id}.png`}
                                                alt={`${result.id}`}
                                            />
                                        </div>
                                    )}
                                </td>
                                {hasSeats && (
                                    <td>
                                        Seats: {result.seats}{" "}
                                        {oldResult?.seats
                                            ? `(${oldResult.seats})`
                                            : ""}
                                    </td>
                                )}
                                {hasPercent && (
                                    <td>
                                        Percent: {result.percent}{" "}
                                        {oldResult?.percent
                                            ? `(${oldResult.percent})`
                                            : ""}
                                    </td>
                                )}
                                {hasAbsolute && (
                                    <td>
                                        Absolute: {result.absolute}{" "}
                                        {oldResult?.absolute
                                            ? `(${oldResult.absolute})`
                                            : ""}
                                    </td>
                                )}
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
