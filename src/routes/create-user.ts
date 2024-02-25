import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function CreateUser(server: FastifyInstance) {
  server.post('/create-user', async (request, reply) => {
    try{
      const {email, password} = request.body as { email: string; password: string };
      if (!email || !password) {
        reply.status(400).send({ message: 'Email e senha são obrigatórios' });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data:{
          email,
          password: hashedPassword
        }
       
      });
 
      return reply.status(201).send({ message: 'Usuário criado com sucesso' });
    }catch(err){
      console.error('Erro ao criar usuário:', err);
      reply.status(500).send({ message: 'Erro ao criar usuário' });
    }
  })
}