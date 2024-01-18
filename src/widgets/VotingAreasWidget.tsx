import Bootstrap from "components/Bootstrap";
import Bars from "components/election/Bars";

const VotingAreasWidget = () => {
    return (
        <Bootstrap widget="votingAreas">
            <Bars />

            <Bars />

            <Bars />
        </Bootstrap>
    );
};

export default VotingAreasWidget;
