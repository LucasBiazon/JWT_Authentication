import { FastifyInstance } from 'fastify';

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from '@fastify/jwt';

const prisma = new PrismaClient();

export async function LoginUser(server: FastifyInstance) {
  server.post('/login', async (request, reply) => {
    const { email, password } = request.body as {email: string, password: string};
    if (!email || !password) {
      reply.status(400).send({ message: 'Email e senha são obrigatórios' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      reply.status(404).send({ message: 'Usuário não encontrado' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      reply.status(401).send({ message: 'Senha incorreta' });
      return;
    }
    try {
      const token = await server.jwt.sign({ id: user.id }, { expiresIn: '1h' });
      return reply.send({ token });
    }catch(err){
      console.error('Erro ao fazer login:', err);
      reply.status(500).send({ message: 'Erro ao fazer login'});
    }
  })
}