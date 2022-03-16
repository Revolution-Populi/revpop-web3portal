import React from "react";

export default function Hello(props: {name?: string}) {
    if (props.name) {
        return <h1>Hello, {props.name}!</h1>;
    } else {
        return <h1>Hey, stranger</h1>;
    }
}
