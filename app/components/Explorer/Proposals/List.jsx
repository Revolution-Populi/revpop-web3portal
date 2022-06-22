import React from "react";
import {Table} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import ProposalsContext from "./Context";
import ExpandedRow from "./ExpandedRow";
import RowActions from "./ProposalRowActions";
import useProposals from "./Hooks/useProposals";

export default function List() {
    const [proposals, loadProposals, updateProposal] = useProposals();

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
            title: counterpart.translate("proposals.id"),
            dataIndex: "id"
        },
        {
            title: counterpart.translate("proposals.review_period"),
            dataIndex: "review_period",
            render: expiration_date => expiration_date.format("lll")
        },
        {
            title: counterpart.translate("proposals.expiration_date"),
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
                updateProposal: updateProposal
            }}
        >
            <div className="network-parameters-proposals">
                <Table
                    className="list"
                    columns={columns}
                    dataSource={prepareProposals()}
                    expandedRowRender={proposal => <ExpandedRow proposal={proposal} />}
                    pagination={false}
                />
            </div>
        </ProposalsContext.Provider>
    );
}
