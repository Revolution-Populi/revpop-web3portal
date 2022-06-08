import {useEffect, useState} from "react";
import {Map} from "immutable";
import {NetworkParameters} from "../../../../Context/NetworkParameters/types";
import ParametersType = NetworkParameters.ParametersType;
import NetworkParameter from "../../../../Context/NetworkParameters/Domain/NetworkParameter";
import LoadAll from "../../../../Context/NetworkParameters/Application/Query/LoadAll/LoadAll";
import LoadAllHandler from "../../../../Context/NetworkParameters/Application/Query/LoadAll/LoadAllHandler";
import blockchainRepository from "../../../../Context/NetworkParameters/Infrastructure/BlockchainRepository";
import jsonParameters from "../../../../Context/NetworkParameters/Domain/parameters.json";
import {JsonParametersType} from "../../../../Context/NetworkParameters/Domain/Factory";

function useParameters() {
    const [parameters, setParameters] = useState<ParametersType>(
        Map<string, NetworkParameter>()
    );

    useEffect(() => {
        loadParameters();
    }, []);

    const loadParameters = async () => {
        const query = new LoadAll();
        const parameters = await new LoadAllHandler(
            blockchainRepository,
            jsonParameters as JsonParametersType
        ).execute(query);

        setParameters(parameters);
    };

    return [parameters, loadParameters, setParameters];
}

export default useParameters;
