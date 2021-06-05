import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../index";
import { config } from "../config";

export default class TagsService {
    static create = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/tags/create.php?user_id=${payload.user_id}&name=${payload.name}`;
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

        const url = `${config.API_BASE_URL}/api/tags/update.php?user_id=${payload.user_id}&tag_id=${payload.tag_id}&name=${payload.name}`;
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

        const url = `${config.API_BASE_URL}/api/tags/delete.php?user_id=${payload.user_id}&tag_id=${payload.tag_id}`;
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

        const url = `${config.API_BASE_URL}/api/tags/list.php?user_id=${payload.user_id}`;
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
