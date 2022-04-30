import React from "react";

export default function ExpandedRow({proposal}) {
    return (
        <div className="expanded-row">
            <ul>
                {proposal.parameters.entrySeq().map(([name, value]) => (
                    <li key={name}>
                        {name}: {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
