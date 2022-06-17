import React from "react";
// @ts-ignore
import {Form, DatePicker} from "bitshares-ui-style-guide";
import moment, {Moment} from "moment";

interface Props {
    onChange: (date: Moment) => void;
}

export default function ExpirationDate({onChange}: Props) {
    function disabledDate(current: Moment) {
        return current && current < moment().endOf("day");
    }

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8}
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16}
        }
    };

    return (
        <Form.Item
            label="Expiration date"
            className="expiration-date"
            {...formItemLayout}
        >
            <DatePicker
                showTime={{
                    defaultValue: moment("00:00:00", "HH:mm:ss"),
                    format: "HH:mm"
                }}
                onChange={onChange}
                disabledDate={disabledDate}
            />
        </Form.Item>
    );
}
