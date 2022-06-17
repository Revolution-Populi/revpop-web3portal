import {useEffect, useState} from "react";
import {Map} from "immutable";
import {LoadAll, loadAllHandler} from "../../../../Context/Fees";
import {Fees} from "../../../../Context/Fees/types";
import OperationsType = Fees.OperationsType;
import Operation from "../../../../Context/Fees/Domain/Operation";

function useFees() {
    const [operations, setOperations] = useState<OperationsType>(
        Map<number, Operation>()
    );
    const [scale, setScale] = useState<number>();
    const [networkPercentOfFee, setNetworkPercentOfFee] = useState<number>();

    useEffect(() => {
        loadOperations();
    }, []);

    const loadOperations = async () => {
        const query = new LoadAll();
        const [
            operations,
            scale,
            networkPercentOfFee
        ] = await loadAllHandler.execute(query);

        setOperations(operations);
        setScale(scale);
        setNetworkPercentOfFee(networkPercentOfFee);
    };

    return [
        operations,
        loadOperations,
        setOperations,
        scale,
        networkPercentOfFee
    ];
}

export default useFees;
