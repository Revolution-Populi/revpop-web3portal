import React from "react";
import {Map} from "immutable";
import jsonOperations from "../../../../app/Context/Fees/Domain/operations.json";
import HelpContent from "../../Utility/HelpContent";
import ChainTypes from "../../Utility/ChainTypes";
import BindToChainState from "../../Utility/BindToChainState";
import FeesContext from "./Context";
import GlobalObjectRepository from "../../../Context/Fees/Infrastructure/GlobalObjectRepository";
import LoadAll from "../../../Context/Fees/Application/Query/LoadAll/LoadAll";
import LoadAllHandler from "../../../Context/Fees/Application/Query/LoadAll/LoadAllHandler";
import ModelViewTransformer from "./ViewModel/ModelViewTransformer";
import Group from "./List/Group";
import ActionButtons from "./ActionButtons";

// let ltm_required = [5, 7, 20, 21, 34];

class Fees extends React.Component {
    static propTypes = {
        globalObject: ChainTypes.ChainObject.isRequired
    };

    static defaultProps = {
        globalObject: "2.0.0"
    };

    constructor(props) {
        super(props);

        this.state = {
            operations: Map(),
            scale: null,
            networkPercent: null
        };

        this.updateOperations = this.updateOperations.bind(this);
    }

    async componentDidMount() {
        const parameters = this.props.globalObject.toJS().parameters;
        const currentFees = parameters.current_fees;

        const repository = new GlobalObjectRepository(
            currentFees.parameters,
            jsonOperations
        );

        const query = new LoadAll();
        const handler = new LoadAllHandler(repository);
        const operations = await handler.execute(query);

        this.setState({
            operations,
            scale: currentFees.scale,
            networkPercent: parameters.network_percent_of_fee
        });
    }

    updateOperations(operations) {
        this.setState({
            operations
        });
    }

    render() {
        if (this.state.operations.isEmpty()) {
            return null;
        }

        const modelViewTransformer = new ModelViewTransformer(
            jsonOperations,
            this.state.scale,
            this.state.networkPercent / this.state.scale
        );

        const groups = modelViewTransformer.transform(this.state.operations);

        return (
            <FeesContext.Provider
                value={{
                    operations: this.state.operations,
                    updateOperations: this.updateOperations
                }}
            >
                <div className="grid-block vertical fees">
                    <div className="grid-block small-12 shrink">
                        <HelpContent path={"components/Fees"} />
                    </div>
                    <div className="list-actions">
                        <ActionButtons />
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
}

export default BindToChainState(Fees);
