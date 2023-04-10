import React, {useState} from "react";
// @ts-ignore
import {DatePicker} from "bitshares-ui-style-guide";
import moment, {Moment} from "moment";

export default function Timelock() {
    const [timeLock, setTimeLock] = useState<Moment>();

    function onChangeHandler(value: Moment) {
        setTimeLock(value);
    }

    function disabledDate(current: Moment) {
        return current && current < moment().endOf("day");
    }

    return (
        <>
            <div>
                &quot;Timelock&quot;: This is the period of time that the smart
                contract will be locked. <br />
                After this Timelock period expires you can call a refund if you
                have not received RVETH
            </div>
            <DatePicker
                showTime={{
                    defaultValue: moment("00:00:00", "HH:mm:ss"),
                    format: "HH:mm:ss"
                }}
                onChange={onChangeHandler}
                disabledDate={disabledDate}
            />
            {timeLock && <div>Unix time: {timeLock.unix()}</div>}
        </>
    );
}
