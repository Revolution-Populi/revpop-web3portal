import React, {useContext, useState} from "react";
import {Map} from "immutable";
// @ts-ignore
import {InputNumber} from "bitshares-ui-style-guide";
import Icon from "../../../Icon/Icon";
import AssetWrapper from "../../../Utility/AssetWrapper";
import utils from "../../../../lib/common/utils";
import FeeValue from "./FeeValue";
import FeesContext from "../Context";

type AssetType = {
    id: string;
    issuer: string;
    symbol: string;
    precision: number;
};

export type Props = {
    value: number;
    asset: Map<string, AssetType>;
};

function FeeValueWithEdit({value, asset}: Props) {
    const [edit, setEdit] = useState(false);

    const precision = utils.get_asset_precision(asset.get("precision"));
    const [newValue, setNewValue] = useState(value / precision);

    const {operations} = useContext(FeesContext);

    if (edit) {
        return (
            <>
                <InputNumber
                    onChange={onChangeHandler}
                    defaultValue={newValue}
                    min={0}
                    step={1 / precision}
                />
                <Icon
                    onClick={onSaveHandler}
                    className="save"
                    name="chevron-down"
                    title="fees.save"
                />
                <Icon
                    onClick={onCancelHandler}
                    className="cancel"
                    name="cross-circle"
                    title="fees.cancel"
                />
            </>
        );
    }

    function onEditHandler() {
        setEdit(true);
    }

    function onSaveHandler() {
        setEdit(false);
    }

    function onCancelHandler() {
        setEdit(false);
    }

    function onChangeHandler(value: number) {
        console.log(value);
        setNewValue(value);
    }

    return (
        <>
            <FeeValue value={value} />
            <Icon onClick={onEditHandler} name="edit" title="fees.edit" />
        </>
    );
}

export default AssetWrapper(FeeValueWithEdit);
