import {onValue, ref, update} from "firebase/database";
import { database} from "../firebase";


// Загрузка данных о пользователях
export async function fetchDataUsers(uid) {
    console.log("UID", uid);
    return new Promise((resolve) => {
        onValue(ref(database), (snapshot) => {
            const data = snapshot.val();
            resolve(data.usersData ? Object.values(data.usersData).find(user => user.userid === uid) : []);
        });
    });
}

export async function updateDataEmailVerified(uid, obj) {
    await update(ref(database, `/usersData/${uid}`), {
        emailVerified: obj.emailVerified
    })
    console.log("Данные email верификации обновлены", obj.emailVerified)

}

