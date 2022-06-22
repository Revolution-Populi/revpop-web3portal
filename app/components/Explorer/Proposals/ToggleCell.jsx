import React from "react";
import Icon from "../../Icon/Icon";

export default function ToggleCell({proposal, selectedProposals, add, remove}) {
    const selected = selectedProposals.has(proposal.name);

    let icon;
    if (selected) {
        icon = <Icon name="checkmark-circle" title="icons.checkmark_circle.yes" />;
    } else {
        icon = <Icon name="minus-circle" title="icons.minus_circle.no" />;
    }

    function onClick() {
        if (selected) {
            remove(proposal.name);
        } else {
            add(proposal.name);
        }
    }

    return <span onClick={onClick}>{icon}</span>;
}
