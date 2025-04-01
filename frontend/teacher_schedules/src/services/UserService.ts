import { User } from "../interfaces/UserInterface";
import { request } from "./RequestService";

export async function save(user : User) {
    const serverJson = JSON.stringify(user)
    try {
        const response = await request("/auth/singup", "POST", serverJson)
        return response;
    } catch (err) {
        console.log("User Create: " + err)
        throw err;  
    }
}

export async function login(user : User) {
    const serverJson = JSON.stringify(user)
    try {
        const response = await request("/auth/singin", "POST", serverJson)
        return response;
    } catch (err) {
        console.log("User Login: " + err)
        throw err;  
    }
}

export async function GetAuth () {
    try {
        const response = await request("/auth", "GET")
        return response;
    } catch (err) {
        console.log("User GetAuth: " + err)
        throw err;  
    }
}

export async function getByEmail (email : string) {
    try {
        const response = await request(`/auth/${email}`, "GET")
        return response;
    } catch (err) {
        console.log("User GetByEmail: " + err)
        throw err;  
    }
}

export async function deleteByEmail (email : string) {
    try {
        const response = await request(`/auth/${email}`, "DELETE")
        return response;
    } catch (err) {
        console.log("User DeleteByEmail: " + err)
        throw err;  
    }
}

export async function updateByEmail (email : string, user : User) {
    const serverJson = JSON.stringify(user)
    try {
        const response = await request(`/auth/${email}`, "PATCH", serverJson)
        return response;
    } catch (err) {
        console.log("User UpdateByEmail: " + err)
        throw err;  
    }
}
