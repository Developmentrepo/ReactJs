import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { history } from "../../index";
import ItemCard from "../../components/Card/ItemCard";
import InfoItem from "../../components/Card/InfoItem";

const AccountInfo = () => {
    const user = useSelector((state) => state.user);

    return (
        <ItemCard title="ACCOUNT INFO" className="md:w-1/3 sm:px-20 md:p-2">
            <InfoItem label="Name">
                {user.first_name} {user.last_name}
            </InfoItem>
            <InfoItem label="Email">{user.email}</InfoItem>
            <InfoItem label="Registered Date">
                <Moment format="MMM DD, YYYY">{user.created_at}</Moment>
            </InfoItem>
            <div
                className="flex flex-col justify-center mt-5 mb-3"
                style={{ paddingLeft: 10, paddingRight: 10 }}
            >
                <button
                    style={{ marginBottom: 10 }}
                    className="button submit-button fill-button"
                    onClick={() => history.push("/update/email")}
                >
                    UPDATE YOUR EMAIL
                </button>
                <button
                    className="button submit-button fill-button"
                    onClick={() => history.push("/update/password")}
                >
                    UPDATE YOUR PASSWORD
                </button>
            </div>
        </ItemCard>
    );
};

export default AccountInfo;
