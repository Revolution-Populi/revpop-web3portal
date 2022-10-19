import React from "react";
// @ts-ignore
import {Card} from "bitshares-ui-style-guide";
// @ts-ignore
import Translate from "react-translate-component";
import GroupViewModel from "../ViewModel/Group";
import OperationViewModel from "../ViewModel/Operation";
import Operation from "./Operation";

export type GroupProps = {
    group: GroupViewModel;
};

export default function Group({group}: GroupProps) {
    return (
        <div>
            <Card>{group.name.toUpperCase()}</Card>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <Translate content={"explorer.block.op"} />
                        </th>
                        <th>
                            <Translate content={"explorer.fees.type"} />
                        </th>
                        <th className="standard-fee">
                            <Translate content={"explorer.fees.fee"} />
                        </th>
                        <th className="lifetime-member-fee">
                            <Translate content={"explorer.fees.feeltm"} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {group.operations
                        .map(operation => (
                            <Operation
                                key={(operation as OperationViewModel).id}
                                operation={operation as OperationViewModel}
                            />
                        ))
                        .toArray()}
                </tbody>
            </table>
        </div>
    );
}
