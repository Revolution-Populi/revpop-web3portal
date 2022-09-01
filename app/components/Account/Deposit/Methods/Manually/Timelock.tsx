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
                Timelock: It is the unix time after which you can make a refund
                if you will not receive RVETH
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
