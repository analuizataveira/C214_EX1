import { Schedule } from "../interfaces/ScheduleInterface";
import { request } from "./RequestService";

export async function getSchedule(): Promise<Array<Schedule>> {
    try {
        const response = await request("/schedules", "GET")
        return response;
    } catch (err) {
        alert("Schedule List " + err)
        return []
    }
}

export async function saveSchedule(schedule: Schedule) {
    const scheduleJson = JSON.stringify(schedule)
    try {
        const response = await request("/schedules/create", "POST", scheduleJson)
        return response;
    } catch (err) {
        alert("Schedule Create: " + err)
    }
}

export async function deleteSchedule(id: number) {
    try {
        const response = await request("/schedules/delete/" + id, "DELETE")
        return response;
    } catch (err) {
        alert("Schedule Delete: " + err)
    }
}

export async function updateSchedule(schedule: Schedule) {
    const scheduleJson = JSON.stringify(schedule)
    try {
        const response = await request("/schedules/update", "PUT", scheduleJson)
        return response;
    } catch (err) {
        alert("Schedule Update: " + err)
    }
}