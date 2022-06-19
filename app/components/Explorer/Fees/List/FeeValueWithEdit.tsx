import React, {useContext, useState} from "react";
import {Map} from "immutable";
// @ts-ignore
import {InputNumber} from "bitshares-ui-style-guide";
import Icon from "../../../Icon/Icon";
import AssetWrapper from "../../../Utility/AssetWrapper";
import utils from "../../../../lib/common/utils";
import FeeValue from "./FeeValue";
import FeesContext from "../Context";
import FeeView from "../ViewModel/Fee";
import UpdateOperation from "../../../../Context/Fees/Application/Command/UpdateOperation/UpdateOperation";
import UpdateOperationHandler from "../../../../Context/Fees/Application/Command/UpdateOperation/UpdateOperationHandler";

type AssetType = {
    id: string;
    issuer: string;
    symbol: string;
    precision: number;
};

export type Props = {
    fee: FeeView;
    operationId: number;
    code: string;
    asset: Map<string, AssetType>;
};

function FeeValueWithEdit({fee, operationId, code, asset}: Props) {
    const [edit, setEdit] = useState(false);
    const [inputValue, setInputValue] = useState(fee.standardFee);

    const precision = utils.get_asset_precision(asset.get("precision"));

    const {operations, updateOperation} = useContext(FeesContext);

    function onEditHandler() {
        setEdit(true);
    }

    function onSaveHandler() {
        const updateRequest = new UpdateOperation(
            operations[operationId],
            code,
            inputValue
        );
        const handler = new UpdateOperationHandler();
        const resultOrError = handler.execute(updateRequest);

        if (resultOrError.isFailure()) {
            return;
        }

        updateOperation(resultOrError.value);

        setEdit(false);
    }

    function onCancelHandler() {
        setEdit(false);
    }

    function onChangeHandler(value: number) {
        setInputValue(value * precision);
    }

    if (edit) {
        return (
            <>
                <InputNumber
                    onChange={onChangeHandler}
                    value={inputValue / precision}
                    min={0}
                    step={1 / precision}
                />
                <span onClick={onSaveHandler}>
                    <Icon
                        className="save"
                        name="chevron-down"
                        title="fees.save"
                    />
                </span>
                <Icon
                    onClick={onCancelHandler}
                    className="cancel"
                    name="cross-circle"
                    title="fees.cancel"
                />
            </>
        );
    }

    return (
        <>
            <FeeValue
                value={fee.standardFee}
                newValue={fee.standardFeeNewValue}
                updated={fee.updated()}
            />
            <Icon onClick={onEditHandler} name="edit" title="fees.edit" />
        </>
    );
}

export default AssetWrapper(FeeValueWithEdit);
