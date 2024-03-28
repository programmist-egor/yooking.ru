import { getYesterdayDate } from "./createDataNow";

export async function checkStatus(inn) {
    if (!/^\d{12}$/.test(inn)) {
        return ("Некорректный формат ИНН. ИНН должен состоять из 12 цифр.");
    }

    const url = "https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status";
    const data = {
        inn: inn,
        requestDate: getYesterdayDate(),
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        } else {
            throw new Error("Failed to fetch data");
        }
    } catch (error) {
        console.error(error);
    }
}