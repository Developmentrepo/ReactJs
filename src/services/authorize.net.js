import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../index";
import { config } from "../config";

export default class AuthorizeNetService {
    static createCustomerProfile = async payload => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${
            config.API_BASE_URL
        }/api/authorize.net/createCustomerProfile.php`;
        const data = payload;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        try {
            return await axios.post(url, data, headers);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static updatePaymentProfile = async payload => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${
            config.API_BASE_URL
        }/api/authorize.net/updatePaymentProfile.php`;
        const data = payload;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        try {
            return await axios.post(url, data, headers);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static createSubscription = async payload => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${
            config.API_BASE_URL
        }/api/authorize.net/createSubscription.php`;
        const data = payload;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        try {
            return await axios.post(url, data, headers);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static updateSubscription = async payload => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${
            config.API_BASE_URL
        }/api/authorize.net/updateSubscription.php`;
        const data = payload;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        try {
            return await axios.post(url, data, headers);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static cancelSubscription = async payload => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${
            config.API_BASE_URL
        }/api/authorize.net/cancelSubscription.php`;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        try {
            return await axios.post(url, payload, headers);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };
}
