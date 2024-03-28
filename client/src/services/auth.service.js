import {$api} from "../http";


export default class AuthService {
    static async registration(newUser) {
        console.log("registration AuthService",newUser);
        return await $api.post("/api/registration", {newUser})
    }
    static async login(email, password) {
        return await $api.post("/api/login", {email, password})
    }
    // static async activate(email, password) {
    //     return await $api.post("/api/activete", {email, password})
    // }
    static async logout() {
        return await $api.post("/api/logout")
    }
    static async refresh() {
        return await $api.get("/api/refresh", { withCredentials: true })
    }
}

