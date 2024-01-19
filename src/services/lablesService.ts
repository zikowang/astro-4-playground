import { PUBLIC_ELECTIONS_LIVE_S3 } from "src/config/env";
import { $globalStore } from "store/globalStore";
import type { QueryParams } from "types/query";

export async function getLabels({ competition, language }: QueryParams) {
    const apiResponse = await fetch(
        `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/assets/feed/${language}/labels.${competition}.xml`,
    );

    const result = await apiResponse.text();

    $globalStore.setKey("labels", result);
    $globalStore.setKey("labelsLoading", false);

    return result;
}
