import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../index";
import { config } from "../config";

export default class ListsService {
    static create = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/lists/create.php?user_id=${payload.user_id}&name=${payload.name}`;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            return await axios.get(url, headers);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static update = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/lists/update.php?user_id=${payload.user_id}&list_id=${payload.list_id}&name=${payload.name}`;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            return await axios.get(url, headers);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static delete = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/lists/delete.php?user_id=${payload.user_id}&list_id=${payload.list_id}`;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            return await axios.get(url, headers);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static list = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/lists/list.php?user_id=${payload.user_id}`;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            return await axios.get(url, headers);
        } catch (e) {
            NotificationManager.error(e.message, e.code ? e.code : "Error");
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };
}
