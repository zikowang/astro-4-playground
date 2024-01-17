const useParams = () => {
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
};

export default useParams;
