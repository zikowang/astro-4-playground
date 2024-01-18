import { PUBLIC_ELECTIONS_LIVE_S3 } from "src/config/env";
import { $globalStore } from "store/globalStore";
import type { QueryParams } from "types/query";

function getParams() {
    const url = new URL(window.location.href);

    const params: QueryParams = {
        // eventId: should not be empty
        eventId: undefined,
        // language: default to "de"
        language: undefined,
        competition: undefined,
        folder: undefined,
        season: undefined,
        round: undefined,
        type: undefined,
        feedName: undefined,
        valueType: undefined,
        hideHeader: undefined,
        hideFooter: undefined,
        // customerConfig: url
        customerConfig: undefined,
    };

    (Object.keys(params) as Array<keyof QueryParams>).forEach((key) => {
        params[key as keyof QueryParams] =
            url.searchParams.get(key) ?? undefined;
    });

    return params;
}

async function getConfig(params: QueryParams) {
    const apiResponse = await fetch(
        `${PUBLIC_ELECTIONS_LIVE_S3}/${params.competition}/config/configAdmin.json`,
    );
    const result = await apiResponse.json();

    return result;
}

async function getLabels(params: QueryParams) {
    const apiResponse = await fetch(
        `${PUBLIC_ELECTIONS_LIVE_S3}/${params.competition}/assets/feed/${params.language}/labels.${params.competition}.xml`,
    );

    const result = await apiResponse.text();

    return result;
}

const buildFetchDataUrl = (params: QueryParams, widget: string) => {
    const { competition, folder, season, round, type, feedName } = params;

    const fetchUrl = `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/${folder}/${season}/${round}/${type}/${feedName}`;
    // const fetchUrl = `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/${folder}/${season}/${round}/${type}/${widget}.json`;

    return fetchUrl;
};

async function getData(params: QueryParams, widget: string) {
    const apiResponse = await fetch(buildFetchDataUrl(params, widget));
    const result = await apiResponse.json();

    return result;
}

async function bootstrap(widget: string) {
    const params = getParams();
    $globalStore.setKey("params", params);

    const [config, labels, data] = await Promise.all([
        getConfig(params),
        getLabels(params),
        getData(params, widget),
    ]);

    $globalStore.setKey("config", config);
    $globalStore.setKey("configLoading", false);

    $globalStore.setKey("labels", labels);
    $globalStore.setKey("labelsLoading", false);

    $globalStore.setKey("data", data);
    $globalStore.setKey("dataLoading", false);
}

const Bootstrap = ({
    widget,
    children,
}: {
    widget: string;
    children?: React.ReactNode;
}) => {
    bootstrap(widget);

    return <>{children}</>;
};

export default Bootstrap;
