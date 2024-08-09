import { FastifyRequest, FastifyReply } from "fastify";
import { verify, VerifyOptions, JwtPayload } from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

interface TypesJwt extends JwtPayload {
  idToken: string;
}

interface RequestQuery {
  idToken: string;
}

const verifySession = (
  request: FastifyRequest<{ Querystring: RequestQuery }>,
  reply: FastifyReply
) => {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  if (!secretKey) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
  try {
    const options: VerifyOptions = { algorithms: ["HS256"] };
    const decoded = verify(token, secretKey, options) as TypesJwt;
    request.query.idToken = decoded.idToken;
    return;
  } catch (error) {
    reply.code(401).send({ message: "Unauthorized" });
    return;
  }
};

export default verifySession;
