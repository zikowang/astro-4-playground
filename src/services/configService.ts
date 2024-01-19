import { PUBLIC_ELECTIONS_LIVE_S3 } from "constants/env";
import { $globalStore } from "store/globalStore";
import type { QueryParams } from "types/query";

export async function getConfig({ competition }: QueryParams) {
    const apiResponse = await fetch(
        `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/config/configAdmin.json`,
    );
    const result: QueryParams = await apiResponse.json();

    $globalStore.setKey("config", result);
    $globalStore.setKey("configLoading", false);

    return result;
}
