import { map } from "nanostores";
import type { QueryParams } from "types/query";

type GlobalStore = {
    params: QueryParams;
    data?: any;
    dataLoading: boolean;
    labels?: any;
    labelsLoading: boolean;
    config?: any;
    configLoading: boolean;
};

export const $globalStore = map<GlobalStore>({
    params: {},
    dataLoading: true,
    labelsLoading: true,
    configLoading: true,
});
