import { PUBLIC_ELECTIONS_LIVE_S3 } from "constants/env";
import { $globalStore } from "store/globalStore";
import type { QueryParams } from "types/query";

function buildFetchDataUrl(
    { competition, folder, season, round, type, feedName }: QueryParams,
    widget: string,
) {
    let fetchUrl = `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/${folder}/${season}/${round}/${type}/${feedName}`;

    if (widget === "") {
        fetchUrl = `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/${folder}/${season}/${round}/${type}/${widget}.json`;
    }

    return fetchUrl;
}

export async function getData<T>(params: QueryParams, widget: string) {
    const apiResponse = await fetch(buildFetchDataUrl(params, widget));
    const result = await apiResponse.json();

    $globalStore.setKey("data", result);
    $globalStore.setKey("dataLoading", false);

    return result as T;
}
