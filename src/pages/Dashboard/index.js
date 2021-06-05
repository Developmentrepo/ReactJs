import React from "react";
import { useSelector } from "react-redux";

import PageTitle from "../../components/Titles/PageTitle";
import Container from "../../components/Container/Container";
import ItemCard from "../../components/Card/ItemCard";
import { history } from "../../index";

const DashboardPage = () => {
    const [credits, files] = useSelector((state) => [
        state.search.credits,
        state.batch.files,
    ]);

    const remained_credits = credits
        ? credits.plan_total - credits.single_search
        : null;

    return (
        <React.Fragment>
            <Container>
                <PageTitle
                    title="DASHBOARD"
                    subtitle="Welcome back to your dashboard"
                />

                <div className="flex justify-center flex-wrap mt-10">
                    <ItemCard
                        title="PROPERTIES"
                        className="md:w-1/3 sm:px-20 md:p-2"
                    >
                        <div className="text-5xl text-gray-800 py-3">0</div>
                        <div className="flex justify-center">
                            <button
                                className="button fill-button submit-button"
                                onClick={() => history.push("/properties")}
                            >
                                GO TO PROPERTIES
                            </button>
                        </div>
                    </ItemCard>
                    <ItemCard
                        title="SINGLE SEARCH"
                        className="md:w-1/3 sm:px-20 md:p-2"
                    >
                        <div className="text-5xl text-gray-800 py-3">
                            {remained_credits || 0}
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="button fill-button submit-button"
                                onClick={() => history.push("/search/single")}
                            >
                                GO TO SEARCH
                            </button>
                        </div>
                    </ItemCard>
                    <ItemCard
                        title="BATCH SEARCH"
                        className="md:w-1/3 sm:px-20 md:p-2"
                    >
                        <div className="text-5xl text-gray-800 py-3">
                            {files.length}
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="button fill-button submit-button"
                                onClick={() => history.push("/search/batch")}
                            >
                                UPLOAD YOUR LIST
                            </button>
                        </div>
                    </ItemCard>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default DashboardPage;
