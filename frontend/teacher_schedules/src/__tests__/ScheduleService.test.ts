import { request } from "../services/RequestService";
import { deleteSchedule, getSchedule, saveSchedule, updateSchedule } from "../services/ScheduleService";

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
        period: "Manhã",
        room: 101,
        building: 1
    };
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("deve buscar a lista de horários com sucesso", async () => {
        const mockRequest = jest.mocked(request);
        mockRequest.mockResolvedValue([mockSchedule]);

        const result = await getSchedule();
        expect(result).toEqual([mockSchedule]);
        expect(request).toHaveBeenCalledWith("/schedules", "GET");
        
    });

    test("deve criar um novo horário", async () => {
        (request as jest.Mock<Promise<unknown>>).mockResolvedValue(mockSchedule);

        const result = await saveSchedule(mockSchedule);

        expect(result).toEqual(mockSchedule);
        expect(request).toHaveBeenCalledWith("/schedules", "POST", JSON.stringify(mockSchedule));
    });

    test("deve deletar um horário", async () => {
        (request as jest.Mock<Promise<unknown>>).mockResolvedValue({ success: true });

        const result = await deleteSchedule(1);

        expect(result).toEqual({ success: true });
        expect(request).toHaveBeenCalledWith("/schedules/delete/1", "DELETE");
    });

    test("deve atualizar um horário", async () => {
        (request as jest.Mock<Promise<unknown>>).mockResolvedValue(mockSchedule);

        const result = await updateSchedule(mockSchedule);

        expect(result).toEqual(mockSchedule);
        expect(request).toHaveBeenCalledWith("/schedules/update/1", "PATCH", JSON.stringify(mockSchedule));
    });
});