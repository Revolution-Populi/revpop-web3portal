import React from "react";
import HelpContent from "../../Utility/HelpContent";
import ParametersList from "./ParametersList";
import counterpart from "counterpart";
import {Tabs} from "bitshares-ui-style-guide";
import ProposalsList from "./Proposals/ProposalsList";

export default function NetworkParameters(props) {
    return (
        <div className="grid-block">
            <div className="grid-block vertical medium-horizontal">
                <div className="grid-block vertical">
                    <div className="grid-content network-parameters">
                        <HelpContent path={"components/NetworkParameters"} />
                        <Tabs animated={false}>
                            <Tabs.TabPane
                                key="/explorer/network-parameters"
                                tab={counterpart.translate(
                                    "network_parameters.list.title"
                                )}
                            >
                                <div className="network-parameters-list">
                                    <ParametersList />
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                key="/explorer/network-parameters/proposals"
                                tab={counterpart.translate(
                                    "network_parameters.proposals.title"
                                )}
                            >
                                <div className="network-parameters-proposals">
                                    <ProposalsList />
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
