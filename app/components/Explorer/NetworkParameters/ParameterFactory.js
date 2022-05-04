import {isNull, isObject} from "lodash-es";

class ParameterFactory {
    create(name, value) {
        if (name === "current_fees") {
            return {
                name,
                link: "123"
            };
        }

        let children = null;
        if (isObject(value)) {
            const childrenKeys = Object.keys(value);
            children = childrenKeys.map(name => this.create(name, value[name]));
        }

        const parameter = {
            name,
            value
        };

        if (!isNull(children)) {
            parameter.children = children;
        }

        return parameter;
    }
}

export default new ParameterFactory();
