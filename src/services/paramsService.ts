import type { QueryParams } from "types/query";

export function getParams() {
    const url = new URL(window.location.href);

    const params: QueryParams = {
        eventId: undefined,
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
        customer: undefined,
        customConfigUrl: undefined,
        customStyleUrl: undefined,
    };

    (Object.keys(params) as Array<keyof QueryParams>).forEach((key) => {
        params[key as keyof QueryParams] =
            url.searchParams.get(key) ?? undefined;
    });

    return params;
}
