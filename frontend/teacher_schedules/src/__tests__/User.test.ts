import { save, login, GetAuth, getByEmail, deleteByEmail, updateByEmail } from "../services/UserService";
import { request } from "../services/RequestService";

jest.mock("../services/RequestService");

describe("UserService", () => {
    const mockUser = { email: "test@example.com", password: "password123" };

    test("1- save - deve criar um usuário com sucesso", async () => {
        (request as jest.Mock).mockResolvedValue({ success: true, message: "Usuário criado" });
        const response = await save(mockUser);
        expect(response).toEqual({ success: true, message: "Usuário criado" });
    });

    test("2- save - deve retornar erro ao tentar criar um usuário", async () => {
        (request as jest.Mock).mockRejectedValue(new Error("Erro ao criar usuário"));
        await expect(save(mockUser)).rejects.toThrow("Erro ao criar usuário");
    });

    test("3- login - deve logar com sucesso", async () => {
        (request as jest.Mock).mockResolvedValue({ success: true, token: "123456" });
        const response = await login(mockUser);
        expect(response).toEqual({ success: true, token: "123456" });
    });

    test("4- login - deve falhar com credenciais inválidas", async () => {
        (request as jest.Mock).mockRejectedValue(new Error("Credenciais inválidas"));
        await expect(login(mockUser)).rejects.toThrow("Credenciais inválidas");
    });

    test("5- GetAuth - deve retornar dados de autenticação", async () => {
        (request as jest.Mock).mockResolvedValue({ user: mockUser });
        const response = await GetAuth();
        expect(response).toEqual({ user: mockUser });
    });

    test("6- GetAuth - deve falhar ao buscar autenticação", async () => {
        (request as jest.Mock).mockRejectedValue(new Error("Erro ao buscar autenticação"));
        await expect(GetAuth()).rejects.toThrow("Erro ao buscar autenticação");
    });

    test("7- getByEmail - deve retornar um usuário", async () => {
        (request as jest.Mock).mockResolvedValue(mockUser);
        const response = await getByEmail("test@example.com");
        expect(response).toEqual(mockUser);
    });

    test("8- getByEmail - deve falhar ao buscar usuário inexistente", async () => {
        (request as jest.Mock).mockRejectedValue(new Error("Usuário não encontrado"));
        await expect(getByEmail("notfound@example.com")).rejects.toThrow("Usuário não encontrado");
    });

    test("9- deleteByEmail - deve deletar um usuário com sucesso", async () => {
        (request as jest.Mock).mockResolvedValue({ success: true });
        const response = await deleteByEmail("test@example.com");
        expect(response).toEqual({ success: true });
    });

    test("10- deleteByEmail - deve falhar ao tentar deletar usuário inexistente", async () => {
        (request as jest.Mock).mockRejectedValue(new Error("Usuário não encontrado"));
        await expect(deleteByEmail("notfound@example.com")).rejects.toThrow("Usuário não encontrado");
    });

    test("11- updateByEmail - deve atualizar um usuário com sucesso", async () => {
        (request as jest.Mock).mockResolvedValue({ success: true, message: "Usuário atualizado" });
        const response = await updateByEmail("test@example.com", mockUser);
        expect(response).toEqual({ success: true, message: "Usuário atualizado" });
    });

    test("12- updateByEmail - deve falhar ao tentar atualizar um usuário inexistente", async () => {
        (request as jest.Mock).mockRejectedValue(new Error("Usuário não encontrado"));
        await expect(updateByEmail("notfound@example.com", mockUser)).rejects.toThrow("Usuário não encontrado");
    });
});