import fastify from "fastify";
const server = fastify();
server.get('/', async (request, reply) => {
  return 'Hello, world JWT!'
})

server.listen({ port: 3000 }, (err, address) => {
  console.log(`Server listening at ${address}`)
})    