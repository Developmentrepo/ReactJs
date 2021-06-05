import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Tour from "reactour";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";
import { useWindowDimensions } from "../../utils/width";

import "./styles.scss";

const style = {
    flexGrow: 1,
    height: "100vh",
    padding: "1rem",
    overflowY: "scroll",
};

const MainLayer = (props) => {
    const { children, user } = props;
    const { width } = useWindowDimensions();

    const isMobile = width < 640;

    const [isTourOpen, setIsTourOpen] = useState(false);
    const [isFinalTourOpen, setIsFinalTourOpen] = useState(false);
    const currentUser = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const steps = [
        {
            selector: ".dashboard-menu",
            content: ({ goTo }) => (
                <div>
                    Welcome to the Dashboard. This is the main page that gives
                    you a snapshot of your records and files.
                    <br />
                    {currentUser.tour_checked == "0" && (
                        <button
                            style={{
                                border: "1px solid rgb(222 222 222)",
                                background: "none",
                                padding: ".3em .7em",
                                fontSize: "inherit",
                                display: "block",
                                cursor: "pointer",
                                margin: "1em auto",
                            }}
                            onClick={() => skipTour()}
                        >
                            CLOSE THIS TOUR
                        </button>
                    )}
                </div>
            ),
        },
        {
            selector: "#tidio-chat-iframe",
            content: ({ goTo }) => (
                <div>
                    Click this sidebar if you need help. One of agents will get
                    back with you shortly.
                    <br />
                    {currentUser.tour_checked == "0" && (
                        <button
                            style={{
                                border: "1px solid rgb(222 222 222)",
                                background: "none",
                                padding: ".3em .7em",
                                fontSize: "inherit",
                                display: "block",
                                cursor: "pointer",
                                margin: "1em auto",
                            }}
                            onClick={() => skipTour()}
                        >
                            CLOSE THIS TOUR
                        </button>
                    )}
                </div>
            ),
        },
        // {
        //     selector: ".properties-menu",
        //     content: ({ goTo }) => (
        //         <div>
        //             PROPERTIES is a collection of all the records that you have
        //             uploaded.
        //             <br />
        //             {currentUser.tour_checked == "0" && (
        //                 <button
        //                     style={{
        //                         border: "1px solid rgb(222 222 222)",
        //                         background: "none",
        //                         padding: ".3em .7em",
        //                         fontSize: "inherit",
        //                         display: "block",
        //                         cursor: "pointer",
        //                         margin: "1em auto",
        //                     }}
        //                     onClick={() => skipTour()}
        //                 >
        //                     CLOSE THIS TOUR
        //                 </button>
        //             )}
        //         </div>
        //     ),
        // },
        {
            selector: ".single-search-menu",
            content: ({ goTo }) => (
                <div>
                    SINGLE SEARCH is where you can search for Individual records
                    using the property owner's name and address.
                    <br />
                    {currentUser.tour_checked == "0" && (
                        <button
                            style={{
                                border: "1px solid rgb(222 222 222)",
                                background: "none",
                                padding: ".3em .7em",
                                fontSize: "inherit",
                                display: "block",
                                cursor: "pointer",
                                margin: "1em auto",
                            }}
                            onClick={() => skipTour()}
                        >
                            CLOSE THIS TOUR
                        </button>
                    )}
                </div>
            ),
        },
        {
            selector: ".batch-search-menu",
            content: ({ goTo }) => (
                <div>
                    BATCH SEARCH is where you can upload your batch lists.
                    <br />
                    {currentUser.tour_checked == "0" && (
                        <button
                            style={{
                                border: "1px solid rgb(222 222 222)",
                                background: "none",
                                padding: ".3em .7em",
                                fontSize: "inherit",
                                display: "block",
                                cursor: "pointer",
                                margin: "1em auto",
                            }}
                            onClick={() => skipTour()}
                        >
                            CLOSE THIS TOUR
                        </button>
                    )}
                </div>
            ),
        },
        {
            selector: ".settings-menu",
            content: ({ goTo }) => (
                <div>
                    The SETTINGS page is where you can view and update your
                    account and subscription information.
                    <br />
                    {currentUser.tour_checked == "0" && (
                        <button
                            style={{
                                border: "1px solid rgb(222 222 222)",
                                background: "none",
                                padding: ".3em .7em",
                                fontSize: "inherit",
                                display: "block",
                                cursor: "pointer",
                                margin: "1em auto",
                            }}
                            onClick={() => skipTour()}
                        >
                            CLOSE THIS TOUR
                        </button>
                    )}
                </div>
            ),
        },
        {
            selector: ".contact-menu",
            content: ({ goTo }) => (
                <div>
                    The CONTACT US page is where you contact one of our agents
                    to resolve your problems with our service.
                    <br />
                    {currentUser.tour_checked == "0" && (
                        <button
                            style={{
                                border: "1px solid rgb(222 222 222)",
                                background: "none",
                                padding: ".3em .7em",
                                fontSize: "inherit",
                                display: "block",
                                cursor: "pointer",
                                margin: "1em auto",
                            }}
                            onClick={() => skipTour()}
                        >
                            CLOSE THIS TOUR
                        </button>
                    )}
                </div>
            ),
        },
    ];
    const finalSteps = [
        {
            selector: ".help-tour",
            content: "Click this icon to restart your tour.",
        },
    ];

    useEffect(() => {
        if (
            user.subscription_id &&
            user.authorized &&
            currentUser.tour_checked == 0
        ) {
            setIsTourOpen(true);
        } else {
            setIsTourOpen(false);
        }
    }, [currentUser]);

    function skipTour() {
        currentUser.tour_checked = 1;
        dispatch({
            type: "user/CHECKED_TOURS",
            payload: currentUser,
        });
        setIsFinalTourOpen(true);
    }

    return (
        <div
            className={clsx(
                "h-screen p-4 flex-grow overflow-y-scroll",
                isMobile && "pb-24"
            )}
        >
            {children}
            {user.subscription_id && user.authorized && (
                <div
                    className={clsx(
                        "help-tour",
                        isMobile && "help-tour-mobile"
                    )}
                    onClick={() => setIsTourOpen(true)}
                >
                    <a
                        data-tip="Click here to see your tour again."
                        data-for="Click here to see your tour again."
                    >
                        ?
                    </a>
                    <ReactTooltip
                        id="Click here to see your tour again."
                        place="left"
                        type="dark"
                        effect="solid"
                    />
                </div>
            )}
            <Tour
                steps={steps}
                isOpen={isTourOpen}
                onRequestClose={() => setIsTourOpen(false)}
            />

            <Tour
                steps={finalSteps}
                isOpen={isFinalTourOpen}
                onRequestClose={() => setIsFinalTourOpen(false)}
                className="final-tour"
            />
        </div>
    );
};

export default MainLayer;
