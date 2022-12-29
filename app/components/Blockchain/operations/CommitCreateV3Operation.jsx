import React from "react";
import {Link} from "react-router-dom";
import TranslateWithLinks from "../../Utility/TranslateWithLinks";

export const CommitCreateV3Operation = ({op}) => {
    return (
        <span>
            <TranslateWithLinks
                string="operation.commit_v3"
                keys={[
                    {
                        arg: "account",
                        type: "account",
                        value: op[1].account
                    },
                    {
                        arg: "hash",
                        value: `${op[1].hash.substring(0, 40)}...`
                    }
                ]}
            />
        </span>
    );
};
