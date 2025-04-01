import { request } from "../services/RequestService";
import { deleteSchedule, getScheduleById, getSchedules, saveSchedule, updateSchedule } from "../services/ScheduleService";

// Mock da função request
jest.mock("../services/RequestService", () => ({
    request: jest.fn(),
}));

describe("ScheduleService", () => {

    const mockSchedule = {
        id: 1,
        professorName: "Professor Teste",
        dayOfService: "Segunda-feira",
        serviceTime: "08:00",
        period: "Matutino",
        room: 101,
        building: 1
    };
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("1- deve buscar a lista de horários com sucesso", async () => {
        (request as jest.Mock).mockResolvedValue([mockSchedule]);

        const result = await getSchedules();
        expect(result).toEqual([mockSchedule]);
        expect(request).toHaveBeenCalledWith("/schedules", "GET");
    });

    test("2- deve retornar erro ao buscar a lista de horários", async () => {
        (request as jest.Mock).mockRejectedValue(new Error("Erro ao buscar horários"));
        await expect(getSchedules()).rejects.toThrow("Erro ao buscar horários");
    });

    test("3- deve buscar um horário pelo ID", async () => {
        (request as jest.Mock).mockResolvedValue(mockSchedule);

        const result = await getScheduleById(1);
        expect(result).toEqual(mockSchedule);
        expect(request).toHaveBeenCalledWith("/schedules/1", "GET");
    });

    test("4- deve retornar erro ao buscar um horário inexistente", async () => {
        (request as jest.Mock).mockRejectedValue(new Error("Horário não encontrado"));
        await expect(getScheduleById(999)).rejects.toThrow("Horário não encontrado");
    });

    test("5- deve criar um novo horário", async () => {
        (request as jest.Mock).mockResolvedValue(mockSchedule);

        const result = await saveSchedule(mockSchedule);
        expect(result).toEqual(mockSchedule);
        expect(request).toHaveBeenCalledWith("/schedules", "POST", JSON.stringify(mockSchedule));
    });

    test("6- deve retornar erro ao tentar criar um horário inválido", async () => {
        const invalidSchedule = {
            id: 0,
            professorName: "",
            dayOfService: "",
            serviceTime: "",
            period: "",
            room: null,
            building: null
        } as unknown as typeof mockSchedule;

        (request as jest.Mock).mockRejectedValue(new Error("Dados inválidos"));
        await expect(saveSchedule(invalidSchedule)).rejects.toThrow("Dados inválidos");
    });

    test("7- deve deletar um horário", async () => {
        (request as jest.Mock).mockResolvedValue({ success: true });

        const result = await deleteSchedule(1);
        expect(result).toEqual({ success: true });
        expect(request).toHaveBeenCalledWith("/schedules/delete/1", "DELETE");
    });

    test("8- deve retornar erro ao tentar deletar um horário inexistente", async () => {
        (request as jest.Mock).mockRejectedValue(new Error("Horário não encontrado"));
        await expect(deleteSchedule(999)).rejects.toThrow("Horário não encontrado");
    });

    test("9- deve atualizar um horário", async () => {
        (request as jest.Mock).mockResolvedValue(mockSchedule);

        const result = await updateSchedule(mockSchedule);
        expect(result).toEqual(mockSchedule);
        expect(request).toHaveBeenCalledWith("/schedules/update/1", "PATCH", JSON.stringify(mockSchedule));
    });

    test("10- deve retornar erro ao tentar atualizar um horário inexistente", async () => {
        const invalidSchedule = { id: 999 } as unknown as typeof mockSchedule;
        (request as jest.Mock).mockRejectedValue(new Error("Horário não encontrado"));
        await expect(updateSchedule(invalidSchedule)).rejects.toThrow("Horário não encontrado");
    });
});
