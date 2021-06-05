import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../index";
import { config } from "../config";

export default class BatchSearchService {
    static upload = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/batchsearch/upload.php`;
        const data = payload;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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

    static download = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/batchsearch/download.php?id=${id}`;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await axios.get(url, headers);
        } catch (e) {
            return null;
        }
    };

    static getFile = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/batchsearch/getFile.php?id=${id}`;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await axios.get(url, headers);
        } catch (e) {
            return null;
        }
    };

    static getFiles = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/batchsearch/getUserFiles.php`;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await axios.get(url, headers);
        } catch (e) {
            NotificationManager.error(
                e.response.message,
                e.code ? e.response.code : "Error"
            );
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };

    static updateFile = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/batchsearch/updateUserFiles.php`;
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await axios.post(url, payload, headers);
        } catch (e) {
            NotificationManager.error(
                e.response.message,
                e.code ? e.response.code : "Error"
            );
            if (e.code === 401) {
                history.push("/login");
            }
            return null;
        }
    };
}
