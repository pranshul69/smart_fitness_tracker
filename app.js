const express = require("express");
const User = require("./models/User");
const mongoose = require("mongoose");


const app = express();

app.use(express.static("public"));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const url =
    "mongodb+srv://pranshul4782:pogar123@cluster1.yfrh43g.mongodb.net/user";
const port = 3000;
const base = `${__dirname}/public`;

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connected to database"))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log("Listening on port:" + port);
});

app.get("/", (req, res) => {
    res.sendFile(`${base}/index.html`);
});

app.get("/login", (req, res) => {
    res.sendFile(`${base}/login.html`);
});

app.post("/add-user", async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        console.log(" Adding user")
        res.send("Successfully added user.");
    } catch (err) {
        res.send(err);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email + ", ");
        console.log(password);
        const user = await User.findOne({ email, password });
        if (user) {
            console.log("Logging in user");
            res.send({ success: true });
        } else {
            console.log("Invalid login");
            res.send({ success: false, message: "Invalid username or password." });
        }
    } catch (err) {
        console.error(`Error: ${err}`);
        res.send({ success: false, message: "An error occurred while logging in." });
    }
});

app.get('*', (req,res)=>{
    res.sendFile(`${base}/404.html`);
})