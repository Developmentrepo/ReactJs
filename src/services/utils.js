import jsPDF from "jspdf";
import "jspdf-autotable";

export default class UtilService {
    static plans = {
        basic: {
            monthly_rate: 49,
            price: 0.08,
            min_credits: 150
        },
        premium: {
            monthly_rate: 99,
            price: 0.05,
            min_credits: 200
        },
        new_premium: {
            monthly_rate: 49,
            price: 0.08,
            min_credits: 150
        }
    };

    static days = ["OVERALL", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    static qualityColors(value) {
        let color;
        switch (value) {
            case "Poor":
                color = "#bf342b";
                break;
            case "Medium":
                color = "#c29600";
                break;
            default:
                color = "#0eb441";
                break;
        }
        return color;
    }

    static phoneQuality(value) {
        let quality;
        switch (value) {
            case "A":
            case "B":
            case "C":
            case "E":
                quality = "High";
                break;
            case "F":
            case "G":
            case "I":
                quality = "Medium";
                break;
            case "J":
            case "K":
                quality = "Poor";
                break;
            default:
                quality = "";
                break;
        }
        return quality;
    }

    static phoneCall(value) {
        let range;
        switch (value) {
            case "A":
                range = "12am-2am";
                break;
            case "B":
                range = "2am-4am";
                break;
            case "C":
                range = "4am-6am";
                break;
            case "D":
                range = "6am-8am";
                break;
            case "E":
                range = "8am-10am";
                break;
            case "F":
                range = "10am-12pm";
                break;
            case "G":
                range = "12pm-2pm";
                break;
            case "H":
                range = "2pm-4pm";
                break;
            case "I":
                range = "4pm-6pm";
                break;
            case "J":
                range = "6pm-8pm";
                break;
            case "K":
                range = "8pm-10pm";
                break;
            case "L":
                range = "10pm-12am";
                break;
            case "N":
                range = "None";
                break;
            default:
                range = "";
        }
        return range;
    }

    static parserResponse(resp) {
        if (typeof resp == "object") {
            return resp;
        } else {
            const start = resp.indexOf("{");
            const end = resp.lastIndexOf("}");

            try {
                return JSON.parse(resp.slice(start, end + 1));
            } catch (e) {
                return null;
            }
        }
    }

    static downloadResultPDF(person, phones) {
        const doc = new jsPDF("p", "pt");
        doc.setFontSize(16);

        doc.autoTable({
            theme: "plain",
            showHead: "never",
            head: [["Key", "Value"]],
            body: [
                ["LastName", person.LastName],
                ["FirstName", person.FirstName],
                ["Address", person.Address],
                ["City", person.City],
                ["State", person.State],
                ["Zip Code", person.Zip],
                person.PhoneNumbers
                    ? ["PhoneNumbers", person.PhoneNumbers]
                    : ["Email", person.Email]
            ]
        });

        let numbers, qualities, optimals;
        if (person.PhoneNumbers) {
            numbers = person.PhoneNumbers.split(",");
            qualities = [
                phones.Phone1_Contactability_Score,
                phones.Phone2_Contactability_Score,
                phones.Phone3_Contactability_Score
            ];
            optimals = [
                phones.Phone1_Call_Window,
                phones.Phone2_Call_Window,
                phones.Phone3_Call_Window
            ];
        } else {
            numbers = [
                phones.Appended_Phone1,
                phones.Appended_Phone2,
                phones.Appended_Phone3
            ];
            qualities = [
                phones.Appended_Phone1_Contactability_Score,
                phones.Appended_Phone2_Contactability_Score,
                phones.Appended_Phone3_Contactability_Score
            ];
            optimals = [
                phones.Appended_Phone1_Call_Window,
                phones.Appended_Phone2_Call_Window,
                phones.Appended_Phone3_Call_Window
            ];
        }

        let th = ["Number", "Quality"];
        th = th.concat(UtilService.days);

        let td = [];

        for (let i = 0; i < numbers.length; i++) {
            let row = [];
            if (numbers[i]) {
                row = row.concat([
                    numbers[i],
                    `${qualities[i]} ${UtilService.phoneQuality(qualities[i])}`
                ]);
                row = row.concat(
                    optimals[i].split("").map(key => UtilService.phoneCall(key))
                );
            }

            td.push(row);
        }

        doc.autoTable({
            theme: "striped",
            styles: {
                fontSize: 9
            },
            head: [th],
            body: td,
            startY: 30 * 8
        });

        doc.save("download.pdf");
    }

    static getFileExtension(filename) {
        return filename.split(".").pop();
    }
}
