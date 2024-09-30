# API Loja

Uma API desenvolvida para o gerenciamento de usuários e produtos, com foco em segurança e controle de acesso. Ela inclui:

-   Autenticação via **JWT (JSON Web Token)** para proteger rotas e garantir que apenas usuários autorizados possam acessar certos recursos.
-   **Criptografia de senhas** utilizando algoritmos seguros para garantir a proteção dos dados dos usuários.
-   **Gerenciamento de permissões** detalhado, permitindo que diferentes níveis de acesso sejam atribuídos a diferentes usuários (ex.: permissões de criação, leitura, atualização e exclusão de usuários e produtos).
-   Integração com **OAuth** via GitHub para login simplificado.
-   **Recuperação de senha** através de e-mail.
-   **CRUD** completo de usuários, produtos e permissões, com validação de permissões em cada operação sensível.

## Tecnologias Utilizadas

-   **Node.js** (v20.17.0)
-   **Docker** (v27.3.1)
-   **JavaScript**

## Pré-requisitos

Certifique-se de que você atendeu aos seguintes requisitos:

-   **Node.js** v20.17.0 ou superior. [Baixe aqui](https://nodejs.org/)
-   **Docker** v27.3.1 ou superior. [Baixe aqui](https://www.docker.com/)

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/api-loja.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd api-loja
    ```

3. Execute a build com o comando:

    ```bash
    yarn run
    ```

## Como usar

1. Para iniciar o servidor da API, execute:

    ```bash
    npm start
    ```

2. A API estará rodando em: `http://localhost:3000`

## Endpoints

### Endpoints de Autenticação

-   **POST /login**  
    Faz o login do usuário e fornece um token do tipo Bearer.  
    **Body JSON**:

    ```json
    {
        "email": "exemplo@exemplo.com",
        "password": "123456"
    }
    ```

-   **POST /reset**  
    Envia um e-mail ao usuário contendo uma nova senha.  
    **Body JSON**:

    ```json
    {
        "email": "exemplo@exemplo.com"
    }
    ```

-   **GET /auth/github**  
    Redireciona o usuário para logar com o GitHub.

-   **GET /auth/github/callback**  
    Callback para finalizar o processo de login via GitHub.

### Endpoints de Usuários

-   **POST /user**  
    Cria um novo usuário (não requer autenticação).  
    **Body JSON**:

    ```json
    {
        "name": "João",
        "email": "exemplo@exemplo.com",
        "password": "123456",
        "phone": 78888999
    }
    ```

-   **GET /user**  
    Lista todos os usuários cadastrados (requer autenticação e a permissão "userRead"). O retorno não inclui as senhas.

-   **GET /user**  
    Lista os detalhes do usuário autenticado, se o ID do token bater com o ID do usuário ou se o usuário tiver a permissão "userRead".

-   **PUT /user/:id**  
    Atualiza os dados de um usuário (requer autenticação). Precisa de permissão "userUpdate" ou que o ID do usuário bata com o ID no token.  
    **Body JSON**:

    ```json
    {
        "name": "João",
        "email": "exemplo@exemplo.com",
        "password": "123456",
        "permissionId": "idPermission"
    }
    ```

-   **DELETE /user/:id**  
    Exclui um usuário (requer autenticação). Precisa da permissão "userDelete" ou que o ID do token bata com o ID do usuário.

### Endpoints de Permissões

-   **POST /permission**  
    Cria uma nova permissão (requer autenticação e a permissão "permissionCreate").  
    **Body JSON**:

    ```json
    {
        "name": "product CRUD",
        "productCreate": true,
        "productRead": true,
        "productUpdate": true,
        "productDelete": true,
        "userCreate": true,
        "userRead": true,
        "userUpdate": true,
        "userDelete": true,
        "permissionCreate": true,
        "permissionRead": true,
        "permissionUpdate": true,
        "permissionDelete": true
    }
    ```

-   **GET /permission**  
    Lista todas as permissões (requer autenticação e a permissão "permissionRead").

-   **GET /permission/:id**  
    Lista os detalhes de uma permissão específica (requer autenticação e a permissão "permissionRead").

-   **PUT /permission/:id**  
    Atualiza uma permissão existente (requer autenticação e a permissão "permissionUpdate").  
    **Body JSON**:

    ```json
    {
        "name": "product CRUD",
        "productCreate": true,
        "productRead": true,
        "productUpdate": true,
        "productDelete": true,
        "userCreate": true,
        "userRead": true,
        "userUpdate": true,
        "userDelete": true,
        "permissionCreate": true,
        "permissionRead": true,
        "permissionUpdate": true,
        "permissionDelete": true
    }
    ```

-   **DELETE /permission/:id**  
    Exclui uma permissão (requer autenticação e a permissão "permissionDelete").

### Endpoints de Produtos

-   **POST /products**  
    Cria um novo produto (requer autenticação e a permissão "productCreate").  
    **Body JSON**:

    ```json
    {
        "name": "product",
        "image_url": "imagem em url",
        "price": 12.5
    }
    ```

-   **GET /products**  
    Lista todos os produtos (não requer autenticação).

-   **GET /products/:id**  
    Lista os detalhes de um produto específico (não requer autenticação).

-   **PUT /products/:id**  
    Atualiza os dados de um produto (requer autenticação e a permissão "productUpdate").  
    **Body JSON**:

    ```json
    {
        "name": "product",
        "image_url": "imagem em url",
        "price": 12.5
    }
    ```

-   **DELETE /products/:id**  
    Exclui um produto (requer autenticação e a permissão "productDelete").

## Licença

Este projeto é **Open Source**.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou fazer pull requests no repositório no GitHub.

## Autor

Desenvolvido por **Danner Kurtz**.
