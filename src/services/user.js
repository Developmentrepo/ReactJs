import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../index";
import { config } from "../config";

export default class UserService {
    static register = async (payload) => {
        const url = `${config.API_BASE_URL}/api/user/post.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static addNewAssistant = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }
        const url = `${config.API_BASE_URL}/api/user/newAssistant.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static contactUS = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }
        const url = `${config.API_BASE_URL}/api/user/contactUS.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static deleteAssistant = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }
        const url = `${config.API_BASE_URL}/api/user/deleteAssistant.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static loadAssistants = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }
        const url = `${config.API_BASE_URL}/api/user/listAssistant.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static login = async (payload) => {
        const url = `${config.API_BASE_URL}/api/auth/login.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static login_v2 = async (payload) => {
        const url = `${config.API_BASE_URL}/api/auth.v2/login.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static requestLoginCode = async (payload) => {
        const url = `${config.API_BASE_URL}/api/auth/sendEmailLoginCode.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static verifyToken = async (payload) => {
        const url = `${config.API_BASE_URL}/api/user/verifyEmail.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static verifyLoginCode = async (payload) => {
        const url = `${config.API_BASE_URL}/api/auth/verifyLoginCode.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static resetPassword = async (payload) => {
        const url = `${config.API_BASE_URL}/api/auth/resetPassword.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static forgotUsername = async (payload) => {
        const url = `${config.API_BASE_URL}/api/auth/forgotUsername.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };

    static updateEmail = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/user/updateemail.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static updatePassword = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/user/updatePassword.php`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static logout = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/auth/logout.php`;
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await axios.post(url, {}, options);
        } catch (e) {
            return null;
        }
    };

    static currentAccount = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/user/currentuser.php`;
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await axios.post(url, {}, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static checkedTours = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }
        const url = `${config.API_BASE_URL}/api/user/put.php?id=${payload.id}`;
        const data = payload;
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await axios.post(url, data, options);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            return null;
        }
    };
}
