import useConfig from "hooks/useConfig";
import useLabels from "hooks/useLabels";
import { map } from "nanostores";
import { PUBLIC_ELECTIONS_LIVE_S3 } from "src/config/env";

type QueryParamStore = {
    data?: any;
    labels?: any;
    configuration?: any;
};

export const globalStore = map<QueryParamStore>({});

function getParams() {
    const url = new URL(window.location.href);

    const result: Record<string, string | undefined> = {
        // eventId: should not be empty
        eventId: undefined,
        // language: default to "en"
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

    Object.keys(result).forEach((key) => {
        result[key as keyof typeof result] =
            url.searchParams.get(key) ?? undefined;
    });

    return result;
}

async function getConfig(params: Record<string, string | undefined>) {
    const apiResponse = await fetch(
        `${PUBLIC_ELECTIONS_LIVE_S3}/${params.competition}/config/configAdmin.json`,
    );
    const result = await apiResponse.json();

    return result;
}

async function getLabels(params: Record<string, string | undefined>) {
    const apiResponse = await fetch(
        `${PUBLIC_ELECTIONS_LIVE_S3}/${params.competition}/assets/feed/${params.language}/labels.${params.competition}.xml`,
    );
    const result = await apiResponse.text();

    return result;
}

export async function bootstrap() {
    const params = getParams();
    const config = await getConfig(params);
    globalStore.setKey("configuration", config);

    const labels = await getLabels(params);
    globalStore.setKey("labels", labels);
}
