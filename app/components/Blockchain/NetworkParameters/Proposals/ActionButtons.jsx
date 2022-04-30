import React from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";

export default function ActionButtons({
    proposals,
    selectedProposals,
    setSelectedProposals
}) {
    function onSave() {
        console.log("onSave");
    }

    function onReset() {
        setSelectedProposals([]);
    }

    return (
        <>
            <Button
                type="primary"
                onClick={onSave}
                disabled={selectedProposals.length === 0}
            >
                <Translate content="account.votes.publish" />
            </Button>
            <Button className="reset" onClick={onReset}>
                <Translate content="account.perm.reset" />
            </Button>
        </>
    );
}
