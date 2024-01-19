import type { QueryParams } from "types/query";

export function getParams() {
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
        cusomerStyle: undefined,
    };

    (Object.keys(params) as Array<keyof QueryParams>).forEach((key) => {
        params[key as keyof QueryParams] =
            url.searchParams.get(key) ?? undefined;
    });

    return params;
}
