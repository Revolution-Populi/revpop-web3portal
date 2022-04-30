import React, {useEffect, useState} from "react";
import {Table} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import ProposalsContext from "./Context";
import {Map} from "immutable";
import proposalRepository from "../Repository/Proposal";
import ToggleCell from "./ToggleCell";
import ExpandedRow from "./ExpandedRow";
import ActionButtons from "./ActionButtons";

export default function ProposalsList() {
    const [proposals, setProposals] = useState(new Map());
    const [selectedProposals, setSelectedProposals] = useState([]);

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
                    toggle: <ToggleCell proposal={proposal} />
                };
            })
            .toArray();
    }

    const columns = [
        {
            key: "name",
            title: counterpart.translate("network_parameters.name"),
            dataIndex: "name"
        },
        {
            title: "Toggle",
            dataIndex: "toggle"
        }
    ];

    const rowSelection = {
        selectedRowKeys: selectedProposals,
        onChange: setSelectedProposals
    };

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
                    setSelectedProposals={setSelectedProposals}
                />
            </div>

            <Table
                className="list"
                columns={columns}
                dataSource={prepareProposals()}
                rowSelection={rowSelection}
                expandedRowRender={proposal => (
                    <ExpandedRow proposal={proposal} />
                )}
                pagination={false}
            />
        </ProposalsContext.Provider>
    );
}
