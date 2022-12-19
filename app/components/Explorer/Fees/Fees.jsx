import React from "react";
import jsonOperations from "../../../../app/Context/Fees/Domain/operations.json";
import HelpContent from "../../Utility/HelpContent";
import FeesContext from "./Context";
import ModelViewTransformer from "./ViewModel/ModelViewTransformer";
import Group from "./List/Group";
import useFees from "./Hooks/useFees";

// let ltm_required = [5, 7, 20, 21, 34];

export default function Fees() {
    const [
        operations,
        loadOperations,
        updateOperation,
        scale,
        networkPercent
    ] = useFees();

    if (Object.keys(operations).length === 0) {
        return null;
    }

    const modelViewTransformer = new ModelViewTransformer(
        jsonOperations,
        scale,
        networkPercent / scale
    );

    const groups = modelViewTransformer.transform(operations);

    return (
        <FeesContext.Provider
            value={{
                operations: operations,
                loadOperations: loadOperations,
                updateOperation: updateOperation,
                scale,
                networkPercentOfFee: networkPercent / scale
            }}
        >
            <div className="grid-block vertical fees">
                <div className="grid-block small-12 shrink">
                    <div className="grid-content">
                        <HelpContent path={"components/Fees"} />
                    </div>
                </div>
                <div className="grid-block small-12">
                    <div className="grid-content">
                        {groups.valueSeq().map(group => (
                            <Group key={group.code} group={group} />
                        ))}
                    </div>
                </div>
            </div>
        </FeesContext.Provider>
    );
}
