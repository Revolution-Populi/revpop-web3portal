import NetworkParameter from "../../app/Context/NetworkParameters/Domain/NetworkParameter";
import {Map} from "immutable";

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
