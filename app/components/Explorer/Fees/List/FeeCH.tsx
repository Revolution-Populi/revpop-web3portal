import React from "react";
import counterpart from "counterpart";
// @ts-ignore
import {Icon, Tooltip} from "bitshares-ui-style-guide";

export default function FeeCH() {
    return (
        <tr>
            <td colSpan={3}>
                Clearing House Participant Transfer Fee
                <Tooltip
                    title={counterpart.translate(
                        "fees.clearing_house_participant_transfer_fee_tooltip"
                    )}
                >
                    <Icon
                        style={{
                            fontSize: "1rem",
                            marginLeft: "0.5rem",
                            marginTop: "0.3rem"
                        }}
                        type={"question-circle"}
                    />
                </Tooltip>
            </td>
        </tr>
    );
}
