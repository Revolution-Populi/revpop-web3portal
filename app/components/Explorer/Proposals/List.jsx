import React from "react";
import {Table} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import ProposalsContext from "./Context";
import ExpandedRow from "./ExpandedRow";
import useProposals from "./Hooks/useProposals";
import jsonParameters from "../../../../app/Context/NetworkParameters/Domain/parameters.json";
import jsonOperations from "../../../../app/Context/Fees/Domain/operations.json";
import ModelViewTransformer from "./ViewModal/ModelViewTransformer";

export default function List() {
    const [proposals, updateProposal] = useProposals();

    const modelViewTransformer = new ModelViewTransformer(jsonParameters, jsonOperations, 10000, 20);
    const proposalsView = modelViewTransformer.transform(proposals);

    const columns = [
        {
            title: counterpart.translate("proposals.id"),
            dataIndex: "id",
            render: (id, proposal) => {
                let changes = [];

                if (proposal.hasChangeParameters) {
                    changes.push("parameters");
                }

                if (proposal.hasChangeOperations) {
                    changes.push("operations");
                }

                return id + ` (${changes.join(", ")})`;
            }
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
                    dataSource={proposalsView}
                    expandedRowRender={proposal => <ExpandedRow proposal={proposal} />}
                    pagination={false}
                />
            </div>
        </ProposalsContext.Provider>
    );
}
