import React, {useEffect, useState} from "react";
// @ts-ignore
import {Form, Input, Select} from "bitshares-ui-style-guide";
// @ts-ignore
import {ChainStore} from "@revolutionpopuli/revpopjs";
import {Map} from "immutable";
import utils from "../../../../lib/common/utils";
import AssetName from "../../../Utility/AssetName";

interface FeeAssetSelectorProps {
    label: string;
    value?: number;
    selectedAsset: string;
    assets: string[];
    onChange: (assetId: string) => void;
}

export default function FeeAssetSelector({
    label,
    value,
    selectedAsset,
    assets,
    onChange
}: FeeAssetSelectorProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [assetsList, setAssetsList] = useState<Map<string, any>[]>([]);

    useEffect(() => {
        const newAssetsList = [];

        for (const asset of assets) {
            const assetInfo = ChainStore.getObject(asset);

            if (Map.isMap(assetInfo)) {
                newAssetsList.push(assetInfo);
            }
        }

        setAssetsList(newAssetsList);
        setLoading(false);
    }, [assets]);

    console.log("AssetsList", assetsList);

    return (
        <div>
            <Form.Item
                label={label}
                style={{margin: "0 0 0 0"}}
                className="amount-selector-field"
            >
                <Input.Group compact>
                    <Input
                        style={{
                            width: "calc(100% - 130px)"
                        }}
                        disabled={true}
                        value={value || ""}
                    />

                    <Select
                        showSearch
                        value={selectedAsset}
                        disabled={loading}
                        style={{width: "130px"}}
                        selectStyle={{width: "100%"}}
                    >
                        {assetsList.map(asset => {
                            const {
                                name: replacedName,
                                prefix
                            } = utils.replaceName(asset);

                            return (
                                <Select.Option
                                    key={`${prefix || ""}${replacedName}`}
                                    value={asset.get("id")}
                                >
                                    <AssetName
                                        noTip
                                        name={asset.get("symbol")}
                                    />
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Input.Group>
            </Form.Item>
        </div>
    );
}
