import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UpdateUserParams {
  userId: string;
}

export async function UpdateUser(server: FastifyInstance) {
  server.put<{ Params: UpdateUserParams }>('/update-information-user', async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        reply.status(401).send({ message: 'Token JWT não fornecido' });
        return;
      }

      const decodedToken: any = await server.jwt.verify(token);
      if (!decodedToken) {
        reply.status(401).send({ message: 'Token JWT inválido' });
        return;
      }

      const userIdFromToken = decodedToken.id;

      const { email, password } = request.body as { email: string, password: string };

      const user = await prisma.user.findUnique({
        where: { id: parseInt(userIdFromToken) }
      });
      if (!user) {
        reply.status(404).send({ message: 'Usuário não encontrado' });
        return;
      }

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userIdFromToken) },
        data: {
          email: email,
          password: await bcrypt.hash(password, 10) 
        }
      });

      reply.status(200).send({ message: `Usuário [${updatedUser.email}] alterado com sucesso` });
    } catch (error) {
      console.error('Erro ao atualizar informações do usuário:', error);
      reply.status(500).send({ message: 'Erro ao atualizar informações do usuário' });
    }
  });
}
