import React from "react";
import {Form, DatePicker} from "bitshares-ui-style-guide";
import moment from "moment";

export default function ExpirationDate({onChange}) {
    function disabledDate(current) {
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
