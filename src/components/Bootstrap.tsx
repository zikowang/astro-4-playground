import type { ReactNode } from "react";

import { getConfig } from "services/configService";
import { getData } from "services/dataService";
import { getLabels } from "services/lablesService";
import { getParams } from "services/paramsService";
import { getCustomStyle } from "services/styleService";
import { $globalStore } from "store/globalStore";

async function bootstrap(widget: string) {
    const params = getParams();
    $globalStore.setKey("params", params);

    await Promise.all([
        getConfig(params),
        getLabels(params),
        getData(params, widget),
        getCustomStyle(params),
    ]);
}

const Bootstrap = ({
    widget,
    children,
}: {
    widget: string;
    children?: ReactNode;
}) => {
    bootstrap(widget);

    return children;
};

export default Bootstrap;
