import React, {useState} from "react";
import Web3 from "web3";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {
    Form,
    Input,
    InputNumber,
    Button,
    DatePicker
} from "bitshares-ui-style-guide";
import {provider} from "web3-core";
import contractAbi from "../../../assets/abi/HashedTimelock.json";
import moment, {Moment} from "moment";

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
}

export default function DepositForm({from}: Props) {
    const [amount, setAmount] = useState(0.1);
    const [hash, setHash] = useState(Web3.utils.randomHex(32));
    const [timeout, setTimeout] = useState(1);

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        // @ts-ignore
        const web3 = new Web3(window.ethereum);

        const contractAddress = "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144";
        const receiver = "0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E";

        //@ts-ignore
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        contract.methods.newContract(receiver, hash, timeout).send({
            from: from,
            value: Web3.utils.toWei(amount.toString())
        });
        // .on("transactionHash", (hash: string) => {
        //     console.log(hash);
        // }).on("confirmation", (confirmationNumber: number, receipt: any) => {
        //     console.log(confirmationNumber);
        // }).on("error", function(error: any, receipt: any) {
        //     console.log(error);
        // });
    }

    function onChangeAmountHandler(amount: number) {
        setAmount(amount);
    }

    function onChangeTimeoutHandler(timeout: Moment) {
        setTimeout(timeout.unix());
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
                    step={0.1}
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
