import React from "react";
import counterpart from "counterpart";
import FormattedAsset from "../../../Utility/FormattedAsset";

export type Props = {
    value: number;
    newValue: number | null;
    updated: boolean;
};

export default function FeeValue({value, newValue, updated}: Props) {
    const isFree = value == 0;

    return (
        <>
            {isFree && counterpart.translate("transaction.feeTypes._none")}

            {!isFree && <FormattedAsset amount={value} asset="1.3.0" />}

            {updated && (
                <span className="new-value">
                    (
                    {
                        <FormattedAsset
                            amount={newValue}
                            hide_asset={true}
                            asset="1.3.0"
                        />
                    }
                    )
                </span>
            )}
        </>
    );
}
