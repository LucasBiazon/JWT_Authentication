import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import {CreateUser} from "./routes/create-user"
import { LoginUser } from "./routes/login-user";
import { LeituratUser } from "./routes/leitura-user";
import { UpdateUser } from "./routes/update-information-user";
import { DeleteUser } from "./routes/delete-user";


const server = fastify();
server.get('/', async (request, reply) => {
  return 'Hello, world JWT!'
})


server.register(fastifyJwt,{secret: 'mysecrete'} )

server.register(CreateUser)
server.register(LoginUser)
server.register(LeituratUser)
server.register(UpdateUser)
server.register(DeleteUser)

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`)
})    