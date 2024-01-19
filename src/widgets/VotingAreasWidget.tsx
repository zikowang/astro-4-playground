import Bars from "components/Bars/Bars";
import Bootstrap from "components/Bootstrap";

const VotingAreasWidget = () => {
    return (
        <Bootstrap widget="votingAreas">
            <h2>Voting Areas</h2>

            <Bars />

            <Bars />

            <Bars />
        </Bootstrap>
    );
};

export default VotingAreasWidget;
