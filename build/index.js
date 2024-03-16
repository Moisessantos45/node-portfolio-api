"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = __importDefault(require("./Router"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
const alloweOrigins = [process.env.HOST_BACKEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (alloweOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use("/Api/1.0", Router_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
