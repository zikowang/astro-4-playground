import useFetch from "hooks/useFetch";
import useParams from "hooks/useParams";
import { PUBLIC_ELECTIONS_LIVE_S3 } from "src/config/env";

const useConfig = () => {
    const { competition } = useParams();

    const { data: config, loading } = useFetch(
        `${PUBLIC_ELECTIONS_LIVE_S3}/${competition}/config/configAdmin.json`,
    );

    return { config, loading };
};

export default useConfig;
