import React, {useContext} from "react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import jsonOperations from "../../../../Context/Fees/Domain/operations.json";
import Context from "../Context";
import ModelViewTransformer from "../ViewModel/ModelViewTransformer";
import {Fees} from "../../../../Context/Fees/types";
import JsonOperationsType = Fees.JsonOperationsType;
import OperationsType = Fees.OperationsType;
import GroupViewModel from "../ViewModel/Group";
import OperationViewModel from "../ViewModel/Operation";
import FeeViewModel from "../ViewModel/Fee";
import FeeValue from "../List/FeeValue";

interface Props {
    changedOperations: OperationsType;
}

export default function ChangedOperations({changedOperations}: Props) {
    const {scale, networkPercentOfFee} = useContext(Context);

    console.log(scale, networkPercentOfFee);

    const modelViewTransformer = new ModelViewTransformer(
        jsonOperations as JsonOperationsType,
        scale,
        networkPercentOfFee
    );
    const groups = modelViewTransformer.transform(changedOperations);

    return (
        <>
            {groups.valueSeq().map(group => {
                group = group as GroupViewModel;
                return <Group key={group.name} group={group} />;
            })}
        </>
    );
}

interface GroupProps {
    key: string;
    group: GroupViewModel;
}

function Group({group}: GroupProps) {
    return (
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
                {group.operations.map(operation => (
                    <Operation
                        key={(operation as OperationViewModel).id}
                        operation={operation as OperationViewModel}
                    />
                ))}
            </tbody>
        </table>
    );
}

interface OperationProps {
    operation: OperationViewModel;
}

function Operation({operation}: OperationProps) {
    return (
        <>
            {operation.fees.map(fee => {
                fee = fee as FeeViewModel;

                if (!fee.updated()) {
                    return null;
                }

                const key = `${operation.id}_${(fee as FeeViewModel).name}`;

                return (
                    <tr key={key}>
                        <td>{operation.name}</td>
                        <td>{fee.name}</td>
                        <td className="standard-fee">
                            <FeeValue
                                value={fee.standardFee}
                                newValue={fee.standardFeeNewValue}
                                updated={fee.updated()}
                            />
                        </td>
                        <td className="lifetime-member-fee">
                            <FeeValue
                                value={fee.lifetimeMemberFee}
                                newValue={fee.lifetimeMemberFeeNewValue}
                                updated={fee.updated()}
                            />
                        </td>
                    </tr>
                );
            })}
        </>
    );
}
