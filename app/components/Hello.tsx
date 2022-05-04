import React from "react";

export default function Hello(props: {name?: string}) {
    let title = "Hey, stranger!";

    if (props.name) {
        title = `Hello, ${props.name}!`;
    }

    return <Header title={title} />;
}

export function Header(props: {title: string}) {
    return <h1>{props.title}</h1>;
}
