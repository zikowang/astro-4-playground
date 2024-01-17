import useParams from "hooks/useParams";
import { PUBLIC_ELECTIONS_LIVE_S3 } from "src/config/env";

const useBuildFetchUrl = () => {
    const { competition, folder, season, round, type, feedName } = useParams();

    return `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/${folder}/${season}/${round}/${type}/${feedName}`;
};

export default useBuildFetchUrl;
