import Parameter from "../../../../app/Context/Proposal/Domain/Parameter";

export type ParameterConstructorType = Partial<
    ConstructorParameters<typeof Parameter>
>;

export function getParameter(props: ParameterConstructorType): Parameter {
    const parameter = Parameter.create(
        props[0] ?? "parameter_0",
        props[1] ?? 1000
    );

    return parameter;
}
