import {useEffect, useState} from "react";
import {Map} from "immutable";
import {NetworkParameters} from "../../../../Context/NetworkParameters/types";
import ParametersType = NetworkParameters.ParametersType;
import NetworkParameter from "../../../../Context/NetworkParameters/Domain/NetworkParameter";
import {LoadAll, loadAllHandler} from "../../../../Context/NetworkParameters";

function useParameters() {
    const [parameters, setParameters] = useState<ParametersType>(
        Map<string, NetworkParameter>()
    );

    useEffect(() => {
        loadParameters();
    }, []);

    const loadParameters = async () => {
        const query = new LoadAll();
        const parameters = await loadAllHandler.execute(query);

        setParameters(parameters);
    };

    return [parameters, loadParameters, setParameters];
}

export default useParameters;
