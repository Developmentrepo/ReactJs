import React from "react";
import PremiumPlan from "./PremiumPlan";
import { history } from "../../index";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/Titles/PageTitle";

const ChooseSubscriptionPage = () => {
    return (
        <React.Fragment>
            <Container>
                <PageTitle title="CHOOSE SUBSCRIPTION" />
                <div className="mb-3 text-right">
                    <button
                        className="small-button fill-button"
                        onClick={() => history.push("/creditcard/update")}
                    >
                        CHANGE YOUR CREDIT CARD
                    </button>
                </div>
                <div className="flex justify-center flex-wrap mt-10">
                    <PremiumPlan />
                </div>
            </Container>
        </React.Fragment>
    );
};

export default ChooseSubscriptionPage;
