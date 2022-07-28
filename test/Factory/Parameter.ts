import NetworkParameter, {
    ParameterValueType
} from "../../app/Context/NetworkParameters/Domain/NetworkParameter";
import {Map} from "immutable";

export function simpleParameter(
    name: string,
    value: ParameterValueType
): NetworkParameter {
    const parameter = new NetworkParameter(name);
    parameter.value = value;
    return parameter;
}

export function committeeProposalReviewPeriod(): NetworkParameter {
    return simpleParameter("committee_proposal_review_period", 300);
}

export function groupParameterWith1LevelChildren(): NetworkParameter {
    const maxPreimageSize = new NetworkParameter("max_preimage_size");
    maxPreimageSize.value = 1024000;

    const maxTimeoutSecs = new NetworkParameter("max_timeout_secs");
    maxTimeoutSecs.value = 2592000;

    const extensions = new NetworkParameter("extensions");
    extensions.children = Map();
    extensions.children = extensions.children.set(
        "max_preimage_size",
        maxPreimageSize
    );
    extensions.children = extensions.children.set(
        "max_timeout_secs",
        maxTimeoutSecs
    );

    return extensions;
}

export function linkParameter(): NetworkParameter {
    const currentFees = new NetworkParameter("current_fees");
    currentFees.link = "/explorer/fees";
    currentFees.linkValue = {
        parameters: [
            [
                0,
                {
                    fee: 86869,
                    price_per_kbyte: 48260
                }
            ],
            [
                1,
                {
                    basic_fee: 482609,
                    premium_fee: 24130471,
                    price_per_kbyte: 48260
                }
            ]
        ],
        scale: 10000
    };

    return currentFees;
}

export function extensionsParameter(): NetworkParameter {
    const maxPreimageSize = new NetworkParameter("max_preimage_size");
    maxPreimageSize.value = 1024000;

    const maxTimeoutSecs = new NetworkParameter("max_timeout_secs");
    maxTimeoutSecs.value = 2592000;

    const updatableHtlcOptions = new NetworkParameter("updatable_htlc_options");
    updatableHtlcOptions.children = Map();
    updatableHtlcOptions.children = updatableHtlcOptions.children.set(
        "max_preimage_size",
        maxPreimageSize
    );
    updatableHtlcOptions.children = updatableHtlcOptions.children.set(
        "max_timeout_secs",
        maxTimeoutSecs
    );

    const extensions = new NetworkParameter("extensions");
    extensions.children = Map();
    extensions.children = extensions.children.set(
        "updatable_htlc_options",
        updatableHtlcOptions
    );

    return extensions;
}
