"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const verifySession = (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return reply.code(401).send({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    if (!secretKey) {
        return reply.code(401).send({ message: "Unauthorized" });
    }
    try {
        const options = { algorithms: ["HS256"] };
        const decoded = (0, jsonwebtoken_1.verify)(token, secretKey, options);
        request.query.idToken = decoded.idToken;
        return;
    }
    catch (error) {
        reply.code(401).send({ message: "Unauthorized" });
        return;
    }
};
exports.default = verifySession;
