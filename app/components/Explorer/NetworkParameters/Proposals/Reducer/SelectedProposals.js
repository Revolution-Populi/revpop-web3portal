import {Set} from "immutable";
import {useReducer} from "react";

function reducer(state, action) {
    switch (action.type) {
        case "add":
            return state.add(action.payload);
        case "remove":
            return state.delete(action.payload);
        case "clear":
            return state.clear();
        default:
            throw new Error();
    }
}

export default function useSelectedProposalsReducer() {
    const [selectedProposals, dispatch] = useReducer(reducer, Set());

    function add(proposalName) {
        dispatch({type: "add", payload: proposalName});
    }

    function remove(proposalName) {
        dispatch({type: "remove", payload: proposalName});
    }

    function clear() {
        dispatch({type: "clear"});
    }

    return [selectedProposals, add, remove, clear];
}
