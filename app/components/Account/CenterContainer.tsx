import React from "react";

type Props = {
    children: JSX.Element;
};

export default function CenterContainer(props: Props) {
    return (
        <div className="grid-block align-center">
            <div className="center-container">{props.children}</div>
        </div>
    );
}
