import React from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";

export default function ParameterActions({parameter, show}) {
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
