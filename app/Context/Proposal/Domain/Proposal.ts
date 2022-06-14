import {Moment} from "moment";
import {ProposalTypes} from "../types";
import ParametersType = ProposalTypes.ParametersType;

export default class Proposal {
    private _voted = false;

    constructor(
        private _id: string,
        private _parameters: ParametersType,
        private _expirationDate: Moment,
        private _reviewPeriod: Moment
    ) {}

    get id(): string {
        return this._id;
    }

    get parameters(): ParametersType {
        return this._parameters;
    }

    get expirationDate(): Moment {
        return this._expirationDate;
    }

    get reviewPeriod(): Moment {
        return this._reviewPeriod;
    }

    setVoted() {
        this._voted = true;
    }

    revokeVote() {
        this._voted = false;
    }

    get voted(): boolean {
        return this._voted;
    }
}
