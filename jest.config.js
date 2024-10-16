module.exports = {
    preset: "ts-jest", // Utilizar ts-jest para compilar TypeScript
    testEnvironment: "node", // Define o ambiente de teste como Node.js
    roots: ["<rootDir>/tests"], // Define a pasta de testes
    transform: {
        "^.+\\.ts$": "ts-jest", // Aplica ts-jest para arquivos .ts
    },
    moduleFileExtensions: ["ts", "js"], // Define as extensões dos arquivos que Jest vai interpretar
    testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // Padrões para encontrar arquivos de teste
};
