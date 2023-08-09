import React, {useState} from "react";
// @ts-ignore
import {connect} from "alt-react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import {Form, Button} from "bitshares-ui-style-guide";
// @ts-ignore
import {ChainStore} from "@revolutionpopuli/revpopjs";
import AccountStore from "../../../../stores/AccountStore";
import {tokenDistributionHandler} from "../../../../Context/TokenDistributionService";
import TokenDistributionRequest from "../../../../Context/TokenDistributionService/Command/TokenDistributionRequest";
import {TokenDistributionAPI} from "../../../../api/apiConfig";

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

interface Props {
    selectedAccountName: string;
}

function TokenDistributionForm({selectedAccountName}: Props) {
    const [tokenSent, setTokenSent] = useState<boolean>(false);
    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const command = new TokenDistributionRequest(
            selectedAccountName,
            TokenDistributionAPI.PHRASE
        );
        await tokenDistributionHandler.execute(command);
        setTokenSent(true);
    }

    if (tokenSent) {
        return (
            <div className="text-center">
                <Translate
                    content="token_distribution.success"
                    component="h4"
                />
            </div>
        );
    }

    return (
        <Form
            {...formItemLayout}
            onSubmit={handleSubmit}
            className="deposit-form"
        >
            <div className="text-center">
                <Translate content="token_distribution.title" component="h4" />
            </div>
            <div className="text-center">{TokenDistributionAPI.PHRASE}</div>
            <Form.Item wrapperCol={{span: 12, offset: 4}}>
                <Button type="primary" htmlType="submit">
                    <Translate content="token_distribution.create" />
                </Button>
            </Form.Item>
        </Form>
    );
}

const TokenDistributionFormWrapped = Form.create({
    name: "tokenDistributionForm"
})(TokenDistributionForm);

export default connect(TokenDistributionFormWrapped, {
    listenTo() {
        return [AccountStore];
    },
    getProps(props: any) {
        return {
            selectedAccountName: AccountStore.getState().currentAccount
        };
    }
});
