import React from "react";
import counterpart from "counterpart";
import FormattedAsset from "../../../Utility/FormattedAsset";

export type Props = {
    value: number;
};

function FeeValue({value}: Props) {
    const isFree = value == 0;

    return (
        <>
            {isFree && counterpart.translate("transaction.feeTypes._none")}

            {!isFree && <FormattedAsset amount={value} asset="1.3.0" />}
        </>
    );
}

export default FeeValue;
