import {useEffect, useState} from "react";
import Operation from "../../../../Context/Fees/Domain/Operation";
import {LoadAll, loadAllHandler} from "../../../../Context/Fees";
import {Fees} from "../../../../Context/Fees/types";
import OperationsType = Fees.OperationsType;

function useFees() {
    const [operations, setOperations] = useState<OperationsType>({});
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

    const updateOperation = (operation: Operation) => {
        setOperations({
            ...operations,
            ...{
                [operation.id]: operation
            }
        });
    };

    return [
        operations,
        loadOperations,
        updateOperation,
        scale,
        networkPercentOfFee
    ];
}

export default useFees;
