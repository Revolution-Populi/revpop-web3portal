import React from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import {Link} from "react-router-dom";

export default function ParameterActions({parameter, show}) {
    if (parameter.link) {
        return (
            <div className="edit-fees">
                <Link to="/explorer/fees">
                    <Translate content="network_parameters.edit_fees" />
                </Link>
            </div>
        );
    }

    return (
        <Button
            type="primary"
            onClick={() => {
                show(parameter);
            }}
        >
            <Translate content="network_parameters.edit" />
        </Button>
    );
}
