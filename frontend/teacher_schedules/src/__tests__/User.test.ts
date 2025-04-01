import { save } from "../services/UserService";
import { request } from "../services/RequestService";
import { User } from "../interfaces/UserInterface";

// Mock da função request
jest.mock("../services/RequestService", () => ({
    request: jest.fn(),
}));

describe("UserService - save()", () => {
    const mockUser: User = {
        email: "usuario@exemplo.com",
        password: "senhaSegura123"
    };

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
        (console.log as jest.Mock).mockRestore();
    });

    test("deve lidar com erro de cadastro", async () => {
        const errorMessage = "Email já cadastrado";
        (request as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
        await save(mockUser);
        
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining(`User Create: Error: ${errorMessage}`)
        );
    });
});