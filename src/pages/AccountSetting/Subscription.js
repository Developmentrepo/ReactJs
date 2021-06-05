import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import UtilService from "../../services/utils";
import Modal from "react-awesome-modal";
import Moment from "react-moment";
import Loading from "../../components/Loading";
import ItemCard from "../../components/Card/ItemCard";
import InfoItem from "../../components/Card/InfoItem";

import { Button, Row, Col, Form } from "react-bootstrap";

import "./styles.scss";

const Subscription = () => {
    const dispatch = useDispatch();
    const [authorizenet, credits] = useSelector((state) => [
        state.authorizenet,
        state.search.credits,
    ]);
    const subscriptTypeToUpdate = authorizenet.subscription
        ? authorizenet.subscription.plan === "basic"
            ? "premium"
            : "basic"
        : null;
    const [renewalDate, setRenewalDate] = useState(null);
    const [leaveModalVisible, setLeaveModalVisible] = useState(false);
    const [reason, setReason] = useState(null);
    const [content, setContent] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (authorizenet.subscription) {
            const startDate = new Date(authorizenet.subscription.start_date);
            const now = new Date();
            if (now.getMonth() === 11) {
                setRenewalDate(
                    new Date(now.getFullYear() + 1, 0, startDate.getDate())
                );
            } else {
                setRenewalDate(
                    new Date(
                        now.getFullYear(),
                        now.getMonth() + 1,
                        startDate.getDate()
                    )
                );
            }
        }
    }, [authorizenet]);

    const updateSubscription = () => {
        dispatch({
            type: "authorize.net/UPDATE_SUBSCRIPTION",
            payload: { subscriptionType: subscriptTypeToUpdate },
        });
    };

    const cancelSubscription = () => {
        dispatch({
            type: "authorize.net/CANCEL_SUBSCRIPTION",
            payload: {
                subscription_id: authorizenet.subscription_id,
                reason: reason,
                content: content,
            },
        });
    };

    const onSubmit = () => {
        confirmAlert({
            title: "Are you sure?",
            message:
                subscriptTypeToUpdate === "premium"
                    ? "You will charge more $50 to upgrade your subscription"
                    : "You cannot unsubscribe and resubscribe to get the discount. We have a zero refund policy.",
            buttons: [
                {
                    label: "Exit",
                    onClick: () => {},
                },
                {
                    label: "Continue with updating",
                    onClick: () => updateSubscription(),
                },
            ],
        });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            cancelSubscription();
            setLeaveModalVisible(false);
        }

        setValidated(true);
    };

    const onCancel = () => {
        setLeaveModalVisible(true);
    };

    return (
        <div className="w-full md:w-1/3 sm:px-20 md:px-0">
            <Modal visible={leaveModalVisible} effect="fadeInUp" width="40%">
                <div className="leave-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <img
                                src="resources/images/crying.png"
                                alt=""
                                style={{
                                    width: "50px",
                                    margin: "0px auto 20px auto",
                                }}
                            />
                            <h4>We're sad to see you go...</h4>
                            <span>
                                Before you cancel, please let us know the reason
                                you are leaving. Every bit of feedback helps!
                            </span>
                        </div>
                        <div className="modal-body">
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                                validated={validated}
                            >
                                <Form.Row>
                                    <Form.Group
                                        as={Col}
                                        md="12"
                                        controlId="validationReason"
                                    >
                                        <Form.Check
                                            required
                                            type="radio"
                                            name="reason"
                                            label="Technical issues"
                                            value="Technical issues"
                                            onChange={(e) => {
                                                setReason(e.target.value);
                                            }}
                                        />
                                        <Form.Check
                                            required
                                            type="radio"
                                            name="reason"
                                            label="Too expensive"
                                            value="Too expensive"
                                            onChange={(e) => {
                                                setReason(e.target.value);
                                            }}
                                        />
                                        <Form.Check
                                            required
                                            type="radio"
                                            name="reason"
                                            label="Switching to another product"
                                            value="Switching to another product"
                                            onChange={(e) => {
                                                setReason(e.target.value);
                                            }}
                                        />
                                        <Form.Check
                                            required
                                            type="radio"
                                            name="reason"
                                            label="Shutting down the company"
                                            value="Shutting down the company"
                                            onChange={(e) => {
                                                setReason(e.target.value);
                                            }}
                                        />
                                        <Form.Check
                                            required
                                            type="radio"
                                            name="reason"
                                            label="Not sure how to use the data & tools"
                                            value="Not sure how to use the data & tools"
                                            onChange={(e) => {
                                                setReason(e.target.value);
                                            }}
                                        />
                                        <Form.Check
                                            required
                                            type="radio"
                                            name="reason"
                                            label="Missing features I need"
                                            value="Missing features I need"
                                            onChange={(e) => {
                                                setReason(e.target.value);
                                            }}
                                        />
                                        <Form.Check
                                            required
                                            type="radio"
                                            name="reason"
                                            label="Other (please explain below)"
                                            value="Other"
                                            onChange={(e) => {
                                                setReason(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="12"
                                        controlId="validationContent"
                                    >
                                        <Form.Control
                                            required={
                                                reason == "Other" ? true : false
                                            }
                                            as="textarea"
                                            row="5"
                                            placeholder="Anything you want to share? (Optional)"
                                            value={content}
                                            onChange={(e) => {
                                                setContent(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please leave anything you want to
                                            share.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row style={{ justifyContent: "center" }}>
                                    <Button
                                        type="submit"
                                        style={{ margin: "10px" }}
                                    >
                                        Cancel Account
                                    </Button>
                                </Form.Row>
                                <Form.Row style={{ justifyContent: "center" }}>
                                    <a
                                        className="cancel-link"
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) =>
                                            setLeaveModalVisible(false)
                                        }
                                    >
                                        Nevermind, I don't want to cancel.
                                    </a>
                                </Form.Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
            <ItemCard title="SUBSCRIPTION">
                <InfoItem label="Plan Type">
                    {authorizenet.subscription
                        ? authorizenet.subscription.plan === "basic"
                            ? "Basic"
                            : "Premium"
                        : "No Plan Now"}
                </InfoItem>
                <InfoItem label="Billing Date">
                    {credits && (
                        <Moment format="MMM DD, YYYY">{renewalDate}</Moment>
                    )}
                </InfoItem>
                <InfoItem label="Monthly Subscription Rate">
                    {authorizenet.subscription &&
                        `$${
                            UtilService.plans[authorizenet.subscription.plan]
                                .monthly_rate
                        }`}
                </InfoItem>
                <InfoItem label="Remaining Single Search">
                    {credits && credits.plan_total - credits.single_search}
                </InfoItem>
                <InfoItem label="Add-on Single Search Price">
                    {authorizenet.subscription &&
                        `$${
                            UtilService.plans[authorizenet.subscription.plan]
                                .price
                        }`}
                </InfoItem>
                <InfoItem label="Batch Search Price">
                    {authorizenet.subscription &&
                        `$${
                            UtilService.plans[authorizenet.subscription.plan]
                                .price
                        }`}
                </InfoItem>
                {/*{*/}
                {/*  authorizenet.subscription &&*/}
                {/*  <div className='flex justify-center mt-5 mb-3'>*/}
                {/*    <button*/}
                {/*      className='button submit-button fill-button'*/}
                {/*      disabled={authorizenet.loading || !authorizenet.subscription.plan}*/}
                {/*      onClick={onSubmit}*/}
                {/*    >*/}
                {/*      {authorizenet.subscription.plan === 'premium' ? 'DOWNGRADE' : 'UPGRADE'} SUBSCRIPTION*/}
                {/*      <Loading type="spin" color="#ffffff" height={18} width={18} />*/}
                {/*    </button>*/}
                {/*  </div>*/}
                {/*}*/}
            </ItemCard>

            <div className="my-2 flex justify-center">
                <button
                    className="button border-0"
                    disabled={
                        authorizenet.loading || !authorizenet.subscription_id
                    }
                    onClick={() => onCancel()}
                >
                    <strong style={{ color: "#777777" }}>
                        CANCEL MY SUBSCRIPTION
                    </strong>
                    <Loading
                        type="spin"
                        color="#777777"
                        height={18}
                        width={18}
                    />
                </button>
            </div>
        </div>
    );
};

export default Subscription;
