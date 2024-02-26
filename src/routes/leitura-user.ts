import fastifyInstace, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { compareSync } from "bcrypt";
import { FastifyJWTOptions } from "@fastify/jwt";

const prisma = new PrismaClient();

interface LeituraUserParams {
  userId: string;
}

export async function LeituratUser(server: FastifyInstance) {
  if (!server.hasDecorator('jwt')) {
    const jwtOptions: FastifyJWTOptions = {
      secret: 'seu_segredo', 
    };

    server.register(require('fastify-jwt'), jwtOptions);
  }
  server.get<{Params: LeituraUserParams}>('/leitura-user', async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        reply.status(401).send({ message: 'Token JWT não fornecido' });
        return;
      }

      const decodedToken: any  = await server.jwt.verify(token);
      if (!decodedToken) {
        reply.status(401).send({ message: 'Token JWT inválido' });
        return;
      }

      const userIdFromToken = decodedToken.id;
      const userIdData = await prisma.user.findUnique({
        where: { id: parseInt(userIdFromToken) }
      })

      const {email, password} = userIdData as {email: string, password:string}
      return reply.status(200).send({
        email: email,
        password: password
      });

    }catch(error){
      console.error('Erro ao buscar usuário:', error);
      reply.status(500).send({ message: 'Erro ao buscar usuário' });
    }
  })
}