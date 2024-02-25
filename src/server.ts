import fastify from "fastify";
import {CreateUser} from "./routes/create-user"
import { LoginUser } from "./routes/login-user";
import { LogoutUser } from "./routes/logout-user";
import { UpdateUser } from "./routes/update-information-user";
import { DeleteUser } from "./routes/delete-user";

const server = fastify();
server.get('/', async (request, reply) => {
  return 'Hello, world JWT!'
})


server.register(CreateUser)
server.register(LoginUser)
server.register(LogoutUser)
server.register(UpdateUser)
server.register(DeleteUser)

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`)
})    