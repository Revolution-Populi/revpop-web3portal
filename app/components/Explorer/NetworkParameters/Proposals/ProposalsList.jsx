import React, {useEffect, useState} from "react";
import {Table} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import ProposalsContext from "./Context";
import {LoadAll, loadAllHandler} from "../../../../Context/Proposal";
import {Map} from "immutable";
import ExpandedRow from "./ExpandedRow";
import RowActions from "./ProposalRowActions";
import Proposal from "../../../../Context/Proposal/Domain/Proposal";

export default function ProposalsList() {
    const [proposals, setProposals] = useState(Map());

    useEffect(() => {
        const loadProposals = async () => {
            const query = new LoadAll();
            const proposals = await loadAllHandler.execute(query);
            setProposals(proposals);
        };
        loadProposals().catch(console.error);
    }, []);

    function prepareProposals() {
        return proposals
            .map(proposal => {
                return {
                    key: proposal.id,
                    id: proposal.id,
                    expiration_date: proposal.expirationDate,
                    review_period: proposal.reviewPeriod,
                    parameters: proposal.parameters,
                    voted: proposal.voted,
                    actions: <RowActions proposal={proposal} />
                };
            })
            .toArray();
    }

    const columns = [
        {
            title: counterpart.translate("network_parameters.proposals.id"),
            dataIndex: "id"
        },
        {
            title: counterpart.translate(
                "network_parameters.proposals.review_period"
            ),
            dataIndex: "review_period",
            render: expiration_date => expiration_date.format("lll")
        },
        {
            title: counterpart.translate(
                "network_parameters.proposals.expiration_date"
            ),
            dataIndex: "expiration_date",
            defaultSortOrder: "ascend",
            sorter: (a, b) => {
                return a.expiration_date - b.expiration_date;
            },
            render: expiration_date => expiration_date.format("lll")
        },
        {
            title: "",
            dataIndex: "actions",
            className: "row-actions"
        }
    ];

    return (
        <ProposalsContext.Provider
            value={{
                proposals: proposals,
                setProposals: setProposals
            }}
        >
            <Table
                className="list"
                columns={columns}
                dataSource={prepareProposals()}
                expandedRowRender={proposal => (
                    <ExpandedRow proposal={proposal} />
                )}
                pagination={false}
            />
        </ProposalsContext.Provider>
    );
}
