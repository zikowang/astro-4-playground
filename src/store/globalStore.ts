import { map } from "nanostores";

import type { Config } from "types/config";
import type { Data } from "types/data";
import type { Label } from "types/labels";
import type { QueryParams } from "types/query";

type GlobalStore = {
    params: QueryParams;
    data?: Data;
    dataLoading: boolean;
    labels?: Label;
    labelsLoading: boolean;
    config?: Config;
    configLoading: boolean;
};

export const $globalStore = map<GlobalStore>({
    params: {},
    dataLoading: true,
    labelsLoading: true,
    configLoading: true,
});
