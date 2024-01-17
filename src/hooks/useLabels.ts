import useFetch from "hooks/useFetch";
import useParams from "hooks/useParams";
import { PUBLIC_ELECTIONS_LIVE_S3 } from "src/config/env";

const useLabels = () => {
    const { language, competition } = useParams();

    const { data: labels, loading } = useFetch(
        `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/assets/feed/${language}/labels.${competition}.xml`,
    );

    return { labels, loading };
};

export default useLabels;
