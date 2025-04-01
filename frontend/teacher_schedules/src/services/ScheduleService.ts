import { Schedule } from "../interfaces/ScheduleInterface";
import { request } from "./RequestService";

export async function getSchedules(): Promise<Array<Schedule>> {
    try {
        const response = await request("/schedules", "GET");
        return response;
    } catch (err) {
        console.error("Schedule List Error:", err);
        throw new Error("Erro ao buscar horários"); // Lança erro para os testes capturarem
    }
}

export async function getScheduleById(id: number): Promise<Schedule> {
    try {
        const response = await request(`/schedules/${id}`, "GET");
        return response;
    } catch (err) {
        console.error("Schedule GetById Error:", err); // Substitui alert por console.error
        throw new Error("Horário não encontrado"); // Lança erro específico
    }
}

export async function saveSchedule(schedule: Schedule): Promise<Schedule> {
    try {
        const scheduleJson = JSON.stringify(schedule);
        const response = await request("/schedules", "POST", scheduleJson);
        return response;
    } catch (err) {
        console.error("Schedule Create Error:", err);
        throw new Error("Dados inválidos"); // Mantém o lançamento de erro
    }
}

export async function deleteSchedule(id: number): Promise<{ success: boolean }> {
    try {
        const response = await request(`/schedules/delete/${id}`, "DELETE");
        return response || { success: true }; // Retorna a resposta ou um objeto padrão
    } catch (err) {
        console.error("Schedule Delete Error:", err);
        throw new Error("Horário não encontrado");
    }
}

export async function updateSchedule(schedule: Schedule): Promise<Schedule> {
    try {
        const scheduleJson = JSON.stringify(schedule);
        const response = await request(
            `/schedules/update/${schedule.id}`,
            "PATCH",
            scheduleJson
        );
        return response;
    } catch (err) {
        console.error("Schedule Update Error:", err); // Substitui alert por console.error
        throw new Error("Horário não encontrado"); // Mensagem consistente
    }
}