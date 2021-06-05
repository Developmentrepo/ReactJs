import React from "react";
import { Field, Form } from "react-final-form";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import UtilService from "../../services/utils";
import Container from "../../components/Container/Container";

const AddCreditPage = () => {
    const [authorizenet, search] = useSelector(state => [
        state.authorizenet,
        state.search
    ]);
    const dispatch = useDispatch();

    const plan = authorizenet.subscription.plan;

    const onSubmit = async payload => {
        payload.subscription_id = search.credits.subscription_id;
        payload.amount = UtilService.plans[plan].price * payload.credits;

        dispatch({
            type: "search/ADD_CREDIT",
            payload: payload
        });
    };

    return (
        <React.Fragment>
            <Container>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col lg:w-1/3 md:w-1/2 sm:w-full w-full">
                                <div className="input-wrapper">
                                    <label>Add Credits:</label>
                                    <Field
                                        name="credits"
                                        component="input"
                                        type="number"
                                        placeholder=""
                                        value="0"
                                        min={
                                            UtilService.plans[plan].min_credits
                                        }
                                        required={true}
                                    />
                                </div>

                                <div
                                    className="input-wrapper"
                                    style={{ justifyContent: "start" }}
                                >
                                    <div className="text-lg">
                                        Credits are{" "}
                                        <strong>
                                            ${UtilService.plans[plan].price}/record
                                        </strong>. Total Cost:{" "}
                                        <strong>
                                            ${UtilService.plans[plan].price *
                                                values.credits || 0}
                                        </strong>
                                    </div>
                                    <div className="text-lg text-red-700">
                                        NOTE: Must purchase a minimum of{" "}
                                        {UtilService.plans[plan].min_credits}{" "}
                                        credits.
                                    </div>
                                </div>

                                <div
                                    className="input-wrapper"
                                    style={{ justifyContent: "start" }}
                                >
                                    <button
                                        className="button submit-button fill-button"
                                        type="submit"
                                        disabled={search.loading}
                                    >
                                        PURCHASE
                                        <Loading
                                            type="spin"
                                            color="#ffffff"
                                            height={18}
                                            width={18}
                                        />
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </Container>
        </React.Fragment>
    );
};

export default AddCreditPage;
