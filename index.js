const express = require("express");
const app = express();
const port = 4000
const userRouter = require("./routers/userRouter");
const imageRouter = require("./routers/imageRouter");
const authRouter = require("./routers/auth");
const jsonParser = express.json();

app.use(jsonParser);


app.use("/users", userRouter);
app.use("/images", imageRouter);
app.use("/auth", authRouter);



app.listen(port, () => {
    console.log(`Server ALIVE on port ${port}`)
})

