import React, {useState} from "react";
import Web3 from "web3";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import counterpart from "counterpart";
import {
    Form,
    Input,
    InputNumber,
    Button,
    DatePicker
    // @ts-ignore
} from "bitshares-ui-style-guide";
import moment, {Moment} from "moment";
import {MakeDeposit, makeDepositHandler} from "../../../Context/Deposit";

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

function disabledDate(current: Moment) {
    return current && current < moment().endOf("day");
}

interface Props {
    from: string;
    onConfirmed: (
        txHash: string,
        amount: number,
        hashLock: string,
        timeout: Moment
    ) => void;
}

//TODO:: add validation to the fields
export default function DepositForm({from, onConfirmed}: Props) {
    const [amount, setAmount] = useState(0.01);
    const [hash, setHash] = useState(Web3.utils.randomHex(32));
    const [timeout, setTimeout] = useState<Moment>(moment().add("1", "days"));

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const command = new MakeDeposit(
            "metamask",
            from,
            Web3.utils.toWei(amount.toString()),
            hash,
            timeout.unix()
        );
        const result = await makeDepositHandler.execute(command);

        if (result.isSuccess()) {
            onConfirmed(result.txHash, amount, hash, timeout);
        } else {
            // TODO::show error
        }
    }

    function onChangeAmountHandler(amount: number) {
        setAmount(amount);
    }

    function onChangeTimeoutHandler(timeout: Moment) {
        setTimeout(timeout);
    }

    return (
        <Form {...formItemLayout} onSubmit={handleSubmit}>
            <div className="text-center">
                <Translate content="deposit.title" component="h4" />
            </div>
            <Form.Item label="Amount">
                <InputNumber
                    defaultValue={amount}
                    min={0}
                    step={0.01}
                    formatter={(value: number) => `${value} ETH`}
                    onChange={onChangeAmountHandler}
                />
            </Form.Item>
            <Form.Item label={counterpart.translate("deposit.hash")}>
                <Input defaultValue={hash} />
            </Form.Item>
            <Form.Item label={counterpart.translate("deposit.timeout")}>
                <DatePicker
                    showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                        format: "HH:mm"
                    }}
                    onChange={onChangeTimeoutHandler}
                    disabledDate={disabledDate}
                    defaultValue={timeout}
                />
            </Form.Item>
            <Form.Item wrapperCol={{span: 12, offset: 4}}>
                <Button type="primary" htmlType="submit">
                    <Translate content="deposit.metamask" />
                </Button>
            </Form.Item>
        </Form>
    );
}
