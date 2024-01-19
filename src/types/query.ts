export type QueryParams = {
    /**
     * should not be empty
     */
    eventId?: string;
    /**
     * default to "de"
     */
    language?: string;
    competition?: string;
    folder?: string;
    season?: string;
    round?: string;
    type?: string;
    feedName?: string;
    valueType?: string;
    hideHeader?: string;
    hideFooter?: string;
    customer?: string;
    /**
     * Full URL to custom config file
     */
    customConfigUrl?: string;
    /**
     * Full URL to custom stylesheet file
     */
    customStyleUrl?: string;
};
