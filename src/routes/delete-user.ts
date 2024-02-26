import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { FastifyJWTOptions } from '@fastify/jwt';

const prisma = new PrismaClient();

interface DeleteUserParams {
  userId: string;
}

export async function DeleteUser(server: FastifyInstance) {
  if (!server.hasDecorator('jwt')) {
    const jwtOptions: FastifyJWTOptions = {
      secret: 'seu_segredo', 
    };

    server.register(require('fastify-jwt'), jwtOptions);
  }

  server.delete<{ Params: DeleteUserParams }>('/delete-user', async (request, reply) => {
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
  
  
        if (userIdFromToken == parseInt(request.params.userId)) {
          reply.status(403).send({ message: 'Usuário não autorizado a realizar esta ação' });
          return;
        }
  
        await prisma.user.delete({
          where: { id: parseInt(userIdFromToken) }
        });
  
        reply.status(200).send({ message: `Usuário com ID ${userIdFromToken} excluído com sucesso` });
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      reply.status(500).send({ message: 'Erro ao excluir usuário' });
    }
  });
}
