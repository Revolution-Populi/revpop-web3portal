import {Map} from "immutable";
import Fee from "./Fee";
import {Fees} from "../types";
import OperationFeesType = Fees.OperationFeesType;

export default class Operation {
    private _fees: OperationFeesType = Map();
    private _showCHParticipantTransferFee = false;

    constructor(private _id: number, private _name: string) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    addFee(fee: Fee) {
        this._fees = this._fees.set(fee.code, fee);
    }

    get fees(): OperationFeesType {
        return this._fees;
    }

    get updated(): boolean {
        return false;
    }

    get showCHParticipantTransferFee(): boolean {
        return this._showCHParticipantTransferFee;
    }

    setShowCHParticipantTransferFee() {
        this._showCHParticipantTransferFee = true;
    }

    getFee(code: string): Fee {
        if (!this.fees.has(code)) {
            throw new Error(`fee ${code} not found`);
        }

        return this.fees.get(code);
    }

    updateFee(code: string, newValue: number) {
        const fee = this.getFee(code);
        fee.update(newValue);
    }
}
