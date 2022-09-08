import React from "react";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Tooltip, Icon, DatePicker} from "bitshares-ui-style-guide";
import moment, {Moment} from "moment/moment";

interface Props {
    timeLock: Moment;
    onChange: (timeLock: Moment) => void;
}

export default function TimeLock({timeLock, onChange}: Props) {
    function disabledDate(current: Moment) {
        return current && current < moment().endOf("day");
    }

    function onChangeHandler(timeLock: Moment) {
        onChange(timeLock);
    }

    const label = (
        <>
            {counterpart.translate("deposit.form.time_lock.label")}
            <Tooltip
                title={counterpart.translate("deposit.form.time_lock.tooltip")}
            >
                <Icon type="question-circle" />
            </Tooltip>
        </>
    );

    return (
        <Form.Item label={label}>
            <DatePicker
                showTime={{
                    defaultValue: moment("00:00:00", "HH:mm:ss"),
                    format: "HH:mm"
                }}
                onChange={onChangeHandler}
                disabledDate={disabledDate}
                defaultValue={timeLock}
            />
        </Form.Item>
    );
}
