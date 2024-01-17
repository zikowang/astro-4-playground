import { useEffect } from "react";
import { bootstrap } from "store/globalStore";

const Bootstrap = ({ children }: { children?: React.ReactNode }) => {
    const handleBootstrap = async () => {
        await bootstrap();
    };

    useEffect(() => {
        handleBootstrap();
    }, []);

    return <>{children}</>;
};

export default Bootstrap;
