import { FastifyRequest } from "fastify/types/request";

//TODO implement getUserFromAPIGateway
export async function getUserFromAPIGateway(req: FastifyRequest) {
  if (req.headers.authorization) {
    //TODO find the actual implementation of getUserFromAPIGateway
    const user = req.headers.authorization;
    return user;
  }
  return null;
}
