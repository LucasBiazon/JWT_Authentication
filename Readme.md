# CRUD Backend with JWT Authentication

Este é um pequeno projeto de CRUD (Create, Read, Update, Delete) backend utilizando Node.js, TypeScript, Fastify, Prisma e SQLite, com autenticação JWT (JSON Web Token).

## Requisitos

- Node.js
- npm (Node Package Manager)
- SQLite
- TypeScript

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/seu-projeto.git](https://github.com/LucasBiazon/JWT_Authentication.git)
```

2. Instale as dependências:

```bash
cd JWT_Authentication
npm install
```

3. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

## Configuração


2. Certifique-se de ter as configurações corretas no arquivo `prisma/schema.prisma` para sua configuração de banco de dados.

## Uso

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

O servidor será executado em `http://localhost:3000`.

## Endpoints

- **POST /auth/register**: Registro de usuário. Parâmetros:  `email`, `password`.
- **POST /auth/login**: Login de usuário. Parâmetros: `email`, `password`.
- **GET /users**: Lista todos os usuários.
- **GET /users/:id**: Obtém detalhes de um usuário específico.
- **PUT /users/:id**: Atualiza informações de um usuário específico. Parâmetros:  `email`, `password`.
- **DELETE /users/:id**: Exclui um usuário específico.

## Exemplo de Requisição

### Registro de Usuário

```http
POST /auth/register
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

### Resposta

```json
{
  "message": "Usuário registrado com sucesso"
}
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests para melhorar este projeto.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.

---

© [Ano do seu projeto] [Seu nome ou organização]
