import { User } from "../interfaces/UserInterface";
import { request } from "./RequestService";

export async function save(user : User) {
    const serverJson = JSON.stringify(user)
    try {
        const response = await request("/user/create", "POST", serverJson)
        return response;
    } catch (err) {
        console.log("User Create: " + err)
    }
}

