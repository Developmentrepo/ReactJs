import React, { useEffect, useState } from "react";
import { history } from "../../index";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Divider from "../Divider/Divider";
import { useWindowDimensions } from "../../utils/width";
import ReactTooltip from "react-tooltip";

const navs = [
    {
        title: "DASHBOARD",
        path: "/dashboard",
        image: "resources/icons/dashboard.png",
        className: "dashboard-menu",
    },
    {
        title: "SINGLE SEARCH",
        path: "/search/single",
        image: "resources/icons/singlesearch.png",
        className: "single-search-menu",
    },
    {
        title: "BATCH SEARCH",
        // "path": "/search/batch/files",
        path: "/search/batch",
        image: "resources/icons/batchsearch.png",
        className: "batch-search-menu",
    },
    // {
    //     title: "PROPERTIES",
    //     path: "/properties",
    //     image: "resources/icons/properties.png",
    //     className: "properties-menu",
    // },
    // {
    //     title: "CLEAN UP YOUR DATABASE",
    //     path: "/properties/remove",
    //     image: "resources/icons/remove.png",
    // },
    // {
    //     title: "ACTIVE LISTS",
    //     path: "/active/list",
    //     image: "resources/icons/list.png",
    //     className: "active-lists-menu",
    // },
    // {
    //     title: "TAGS",
    //     path: "/tags/list",
    //     image: "resources/icons/tag.png",
    //     className: "tags-menu",
    // },
    // {
    //     title: "RECORDS",
    //     path: "/records/list",
    //     image: "resources/icons/servers.png",
    //     className: "records-lists-menu",
    // },
    {
        title: "ADD ASSISTANTS",
        path: "/assistants/list",
        image: "resources/icons/users.png",
        className: "assitants-menu",
    },
    {
        title: "SETTINGS",
        path: "/account/setting",
        image: "resources/icons/setting.png",
        className: "settings-menu",
    },
    {
        title: "CONTACT US",
        path: "/contactUs",
        image: "resources/icons/help.png",
        className: "contact-menu",
    },
    // {
    //     title: "KNOWLEDGE BASE",
    //     path: "/help",
    //     image: "resources/icons/help.png",
    // },
];

const assistant_navs = [
    {
        title: "DASHBOARD",
        path: "/dashboard",
        image: "resources/icons/dashboard.png",
        className: "dashboard-menu",
    },
    {
        title: "SINGLE SEARCH",
        path: "/search/single",
        image: "resources/icons/singlesearch.png",
        className: "single-search-menu",
    },
    {
        title: "BATCH SEARCH",
        // "path": "/search/batch/files",
        path: "/search/batch",
        image: "resources/icons/batchsearch.png",
        className: "batch-search-menu",
    },
];

const NavButton = (props) => {
    const { title, path, image, className } = props;
    const [isActive, setActive] = useState(false);
    const router = useSelector((state) => state.router);

    const handleClick = () => {
        history.push(path);
        setActive(true);
    };

    useEffect(() => {
        setActive(router.location.pathname === path);
    }, [router]);

    return (
        <div
            className={clsx(
                "nav-button d-flex justify-center items-center",
                className
            )}
            style={{ opacity: isActive ? 1 : 0.5 }}
        >
            <a data-tip={title} data-for={title}>
                <img
                    src={image}
                    alt=""
                    style={{ width: "32px", cursor: "pointer" }}
                    onClick={handleClick}
                />
            </a>
            <ReactTooltip id={title} place="right" type="dark" effect="solid" />
        </div>
    );
};

const Navbar = () => {
    const { width } = useWindowDimensions();
    const user = useSelector((state) => state.user);

    const isMobile = width < 640;

    return (
        <div
            className={clsx(
                "bg-black",
                isMobile ? "fixed w-screen bottom-0 p-3" : "px-3 py-5"
            )}
        >
            {!isMobile && (
                <div className="logo" style={{ width: "64px" }}>
                    <img
                        src="resources/images/logo.png"
                        alt="logo"
                        onClick={() => history.push("/")}
                    />
                </div>
            )}
            {!isMobile && <Divider className="mt-4 mb-10" />}

            <div
                className={clsx(isMobile && "flex justify-around items-center")}
            >
                {!user.owner_id && navs.map(({ title, path, image, className }) => (
                    <NavButton
                        key={path}
                        title={title}
                        path={path}
                        image={image}
                        className={clsx(
                            isMobile ? "p-3 " + className : "p-4 " + className
                        )}
                    />
                ))}
                {user.owner_id && assistant_navs.map(({ title, path, image, className }) => (
                    <NavButton
                        title={title}
                        path={path}
                        image={image}
                        className={clsx(
                            isMobile ? "p-3 " + className : "p-4 " + className
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default Navbar;
