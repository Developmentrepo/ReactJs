import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../index";
import { config } from "../config";

export default class RecordsService {
    static getRecords = async (payload) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }

        const url = `${config.API_BASE_URL}/api/records/list.php?user_id=${payload.user_id}&page=${payload.page}&type=${payload.type}`;
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
