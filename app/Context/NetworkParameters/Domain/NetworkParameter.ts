import {Map} from "immutable";
import {NetworkParameters} from "../types";
import BlockchainParameterType = NetworkParameters.BlockchainParameterType;
import ParameterType = NetworkParameters.ParameterType;

export type ParameterValueType = string | number | boolean;

//TODO: refactor to different classes for parameters: normal, group, link
export default class NetworkParameter {
    private _value: ParameterValueType | null = null;
    private _newValue: ParameterValueType | null = null;
    private _description: string | null = null;
    private _type: ParameterType | null = null;
    private _modified = false;
    private _link: string | null = null;
    private _linkValue: BlockchainParameterType | null = null;
    private _children: Map<string, NetworkParameter> = Map();

    constructor(private _name: string) {}

    get name(): string {
        return this._name;
    }

    set value(value) {
        this._value = value;
    }

    get value(): ParameterValueType | null {
        return this._value;
    }

    get newValue(): ParameterValueType | null {
        return this._newValue;
    }

    set newValue(value: ParameterValueType | null) {
        if (value === this.value) {
            this._newValue = null;
            this._modified = false;
            return;
        }

        this._newValue = value;
        this._modified = true;
    }

    get description(): string | null {
        return this._description;
    }

    set description(value: string | null) {
        this._description = value;
    }

    get type(): ParameterType | null {
        return this._type;
    }

    set type(value: ParameterType | null) {
        this._type = value;
    }

    get link(): string | null {
        return this._link;
    }

    set link(value: string | null) {
        this._link = value;
    }

    get linkValue(): BlockchainParameterType | null {
        return this._linkValue;
    }

    set linkValue(value: BlockchainParameterType | null) {
        this._linkValue = value;
    }

    get children(): Map<string, NetworkParameter> {
        return this._children;
    }

    set children(value: Map<string, NetworkParameter>) {
        this._children = value;
    }

    public isNormal() {
        return this.value !== null && !this.isGroup();
    }

    public isLink() {
        return this.link !== null;
    }

    public isGroup() {
        return this._children.size > 0;
    }

    public isModified(): boolean {
        return this._modified;
    }
}
