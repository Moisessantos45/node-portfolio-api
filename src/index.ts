import express from "express";
import router from "./Router";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

const alloweOrigins = [process.env.HOST_BACKEND_URL];

const corsOptions = {
  origin: function (origin: any, callback: Function) {
    if (alloweOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};

app.use(cors(corsOptions));

app.use("/Api/1.0", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
