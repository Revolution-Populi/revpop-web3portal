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

export default function OperationRow({
    name,
    config,
    headIncluded
}: OperationTitleProps) {}
