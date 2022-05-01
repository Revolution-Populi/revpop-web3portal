import React, {useEffect, useReducer, useState} from "react";
import {Table} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import ProposalsContext from "./Context";
import {Map} from "immutable";
import proposalRepository from "../Repository/Proposal";
import ToggleCell from "./ToggleCell";
import ExpandedRow from "./ExpandedRow";
import ActionButtons from "./ActionButtons";
import useSelectedProposalsReducer from "./Reducer/SelectedProposals";

export default function ProposalsList() {
    const [proposals, setProposals] = useState(Map());
    const [
        selectedProposals,
        addSelectedProposal,
        removeSelectedProposal,
        clearSelectedProposals
    ] = useSelectedProposalsReducer();

    useEffect(() => {
        const loadProposals = async () => {
            const parameters = await proposalRepository.load();
            setProposals(new Map(Object.entries(parameters)));
        };
        loadProposals().catch(console.error);
    }, []);

    function prepareProposals() {
        return proposals
            .map(proposal => {
                return {
                    key: proposal.name,
                    name: proposal.name,
                    parameters: proposal.parameters,
                    toggle: (
                        <ToggleCell
                            proposal={proposal}
                            selectedProposals={selectedProposals}
                            add={addSelectedProposal}
                            remove={removeSelectedProposal}
                        />
                    )
                };
            })
            .toArray();
    }

    function rowClassName(row) {
        if (!selectedProposals.has(row.name)) {
            return "unsupported";
        }

        return "";
    }

    const columns = [
        {
            key: "name",
            title: counterpart.translate("network_parameters.name"),
            dataIndex: "name"
        },
        {
            title: "Toggle",
            dataIndex: "toggle",
            className: "toggle"
        }
    ];

    return (
        <ProposalsContext.Provider
            value={{
                proposals: proposals
            }}
        >
            <div className="actions">
                <ActionButtons
                    proposals={proposals}
                    selectedProposals={selectedProposals}
                    clear={clearSelectedProposals}
                />
            </div>

            <Table
                className="list"
                columns={columns}
                dataSource={prepareProposals()}
                rowClassName={rowClassName}
                expandedRowRender={proposal => (
                    <ExpandedRow proposal={proposal} />
                )}
                pagination={false}
            />
        </ProposalsContext.Provider>
    );
}
