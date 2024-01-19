import type { QueryParams } from "types/query";

async function addStyleLinkElement(cssUrl: string) {
    const head = document.head || document.getElementsByTagName("head")[0];
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = cssUrl;

    head.appendChild(link);

    await Promise.resolve(true);
}

// TODO: decide if we want to use this approach or the one above
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function addStyleToBody(cssUrl: string) {
    const apiResponse = await fetch(cssUrl);
    const customCss = await apiResponse.text();

    if (customCss) {
        const body = document.body || document.getElementsByTagName("body")[0];
        const style = document.createElement("style");

        style.textContent = customCss;

        body.appendChild(style);
    }
}

export async function getCustomStyle({ customStyleUrl }: QueryParams) {
    if (!customStyleUrl) {
        return null;
    }

    // add style link to head elecment
    await addStyleLinkElement(customStyleUrl);

    // add style tag to body element
    // await addStyleToBody(customStyleUrl);

    return customStyleUrl;
}
