const express = require("express");
const app = express();
const port = 5000;
const mysql = require("./connection").con;
const cors = require("cors"); // importing middleware

app.use(cors());
app.use(express.json());

const generate_key = function () {
    return Math.floor(Math.random() * 1000 + 1);
};

app.get("/", (req, res) => {
    // fetching data from form
    const { sessionId } = req.query;

    // Sanitization XSS...
    let qry = "select * from time_tracker";
    mysql.query(qry, (err, results) => {
        if (err) throw err;
        else {
            res.send(results);
        }
    });
});

app.post("/", (req, res) => {
    // fetching data from form

    console.log("This is body", req.body);

    //res.send(req.body);

    const { session_id, date, total_time, total_pause } = req.body;

    // Sanitization XSS...
    let qry2 = "insert into time_tracker values(?,?,?,?)";
    mysql.query(
        qry2,
        [generate_key(), total_time, total_pause, date],
        (err, results) => {
            if (results.affectedRows > 0) {
                //res.render("add", { mesg: true });
                res.send(results);
            }
        }
    );
});

//Create Server
app.listen(port, (err) => {
    if (err) throw err;
    else console.log("Server is running at port %d:", port);
});
