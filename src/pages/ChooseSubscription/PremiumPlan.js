import React, { useState } from "react";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../../components/Card/ItemCard";

const PremiumPlan = () => {
    const authorizenet = useSelector(state => state.authorizenet);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);

        dispatch({
            type: "authorize.net/CREATE_SUBSCRIPTION",
            payload: {
                customerProfileId: authorizenet.customer_profile_id,
                paymentProfileId: authorizenet.payment_profile_id,
                subscriptionType: "new_premium"
            }
        });
    };

    return (
        <ItemCard title="PREMIUM PLAN" className="max-w-lg md:w-1/2">
            <p className="mt-1">(BEST VALUE)</p>
            <ul className="p-10 list-outside list-disc text-xl text-left">
                <li>
                    <strong>$49.00</strong> Monthly Subscription
                </li>
                <li>
                    Free <strong>250</strong> Single Searches
                </li>
                <li>
                    <strong>8¢</strong> per record for additional Single
                    Searches
                </li>
                <li>
                    Batch Search - <strong>8¢</strong> per record
                </li>
                <li>Litigation & DNC Scrub Included</li>
                <li>
                    <strong>3¢</strong> per record for Email Appends
                </li>
                <li>
                    Up to <strong>3</strong> Phone Number Appends
                </li>
                <li>Number Quality Score</li>
                <li>Flip Your List</li>
                <li>Click to Call</li>
                <li>Instant download save</li>
            </ul>
            <div className="input-wrapper my-5 text-center">
                <button
                    className="button submit-button fill-button"
                    onClick={() => onSubmit()}
                    disabled={authorizenet.loading}
                >
                    SUBSCRIBE
                    {loading && (
                        <Loading
                            type="spin"
                            color="#ffffff"
                            height={18}
                            width={18}
                        />
                    )}
                </button>
            </div>
        </ItemCard>
    );
};

export default PremiumPlan;
