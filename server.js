const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./utils");
const userRouters = require("./routes/user.routes");
const postRouters = require("./routes/post.routes");

const app = express();
const port = process.env.PORT ?? 5000;

app.use(express.json());
app.use(cors());

app.use("/users", userRouters);
app.use("/posts", postRouters);

app.listen(port, () => {
	console.log("Server is running on port 5000");
	connectToDB();
});
