import { PUBLIC_ELECTIONS_LIVE_S3 } from "constants/env";
import { $globalStore } from "store/globalStore";
import type { Config } from "types/config";
import type { QueryParams } from "types/query";

function mergeConfig(adminConfig: Config, customConfig: Config): Config {
    const result = { ...adminConfig };

    // TODO: merge configs and return merged config
    Object.keys(customConfig).forEach((key) => {
        result[key] = customConfig[key];
    });

    return adminConfig;
}

export async function getConfig({ competition, customConfigUrl }: QueryParams) {
    const apiResponse = await fetch(
        `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/config/configAdmin.json`,
    );
    const adminConfig: Config = await apiResponse.json();

    let resultConfig = adminConfig;

    if (customConfigUrl) {
        const customConfigResponse = await fetch(customConfigUrl);
        const customConfig: Config = await customConfigResponse.json();

        if (customConfig) {
            resultConfig = mergeConfig(adminConfig, customConfig);
        }
    }

    $globalStore.setKey("config", resultConfig);
    $globalStore.setKey("configLoading", false);

    return adminConfig;
}
