import React from "react";
import classNames from "classnames";

type OperationConfig = {
    rowSpan?: number;
};

export type OperationTitleProps = {
    name: string;
    config: OperationConfig;
    headIncluded: boolean;
};

export default function OperationTitle({
    name,
    config,
    headIncluded
}: OperationTitleProps) {
    if (headIncluded) {
        return null;
    }

    return (
        <td rowSpan={config?.rowSpan ?? 1}>
            <span className={classNames("label", "info")}>{name}</span>
        </td>
    );
}
