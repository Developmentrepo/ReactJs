import React from "react";
import "./AppendedPhoneItem.scss";
import UtilService from "../../services/utils";
import { useWindowDimensions } from "../../utils/width";

const AppendedPhoneItem = (props) => {
    const { number, quality, optimal } = props;

    return (
        <div
            className="mt-2 mb-8 px-4 py-2"
            style={{ backgroundColor: "#f6f6f6" }}
        >
            <div className="flex flex-wrap">
                <div className="p-1 mr-16">
                    <div className="text-base">Phone Number:</div>
                    <div className="font-bold text-xl flex items-center">
                        <a href={"tel:+" + number}>{number}</a>
                    </div>
                </div>

                <div className="p-1 mr-16">
                    <div className="text-base">Number Quality Score:</div>
                    <div className="font-bold text-xl flex items-center">
                        <div className="font-bold">{quality}</div>
                        <PhoneQualityMark
                            quality={UtilService.phoneQuality(quality)}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full p-1">
                <div className="text-base">Optimal Call Window:</div>

                <OCWTable optimal={optimal} />
            </div>
        </div>
    );
};

const OCWTable = (props) => {
    const { optimal } = props;
    const { width } = useWindowDimensions();
    const isMobile = width < 640;

    return isMobile ? (
        <div>
            <table className="single-search-table">
                <thead>
                    <tr>
                        {UtilService.days.slice(0, 4).map((key) => (
                            <th>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {optimal
                            .split("")
                            .slice(0, 4)
                            .map((key) => (
                                <td>{UtilService.phoneCall(key)}</td>
                            ))}
                    </tr>
                </tbody>
            </table>
            <table className="single-search-table">
                <thead>
                    <tr>
                        {UtilService.days.slice(4).map((key) => (
                            <th>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {optimal
                            .split("")
                            .slice(4)
                            .map((key) => (
                                <td>{UtilService.phoneCall(key)}</td>
                            ))}
                    </tr>
                </tbody>
            </table>
        </div>
    ) : (
        <div className="overflow-scroll">
            <table className="single-search-table">
                <thead>
                    <tr>
                        {UtilService.days.map((key) => (
                            <th>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {optimal.split("").map((key) => (
                            <td>{UtilService.phoneCall(key)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const PhoneQualityMark = (props) => {
    const { quality } = props;
    const style = {
        fontSize: ".7rem",
        fontWeight: "bold",
        color: "#ffffff",
        backgroundColor: UtilService.qualityColors(quality),
        border: `1px ${UtilService.qualityColors(quality)} solid`,
        margin: "0 8px",
        padding: "0 6px",
    };
    return <div style={style}>{quality.toUpperCase()}</div>;
};

export default AppendedPhoneItem;
