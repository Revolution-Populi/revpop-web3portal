import React from "react";
import {Link} from "react-router-dom";
import TranslateWithLinks from "../../Utility/TranslateWithLinks";

export const RevealCreateV3Operation = ({op}) => {
    return (
        <span>
            <TranslateWithLinks
                string="operation.reveal_v3"
                keys={[
                    {
                        arg: "account",
                        type: "account",
                        value: op[1].account
                    },
                    {
                        arg: "value",
                        value: op[1].value
                    }
                ]}
            />
        </span>
    );
};
