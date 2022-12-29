import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const corsConfig = {
    origin: "http://localhost:3000",
}

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
