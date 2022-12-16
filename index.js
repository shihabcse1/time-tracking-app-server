const express = require("express");
const app = express();
const port = 5000;
const mysql = require("./connection").con;

// Routing
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/add", (req, res) => {
    // fetching data from form
    const { sessionId } = req.query;

    // Sanitization XSS...
    let qry = "select * from time_tracker where session_id=?";
    mysql.query(qry, [sessionId], (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {
                //res.render("add", { checkmesg: true });
                res.send(results);
            } else {
                // insert query
                let qry2 = "insert into time_tracker values(?,?,?,?)";
                mysql.query(
                    qry2,
                    //["03", "22/03/22", 2000, 2],
                    [sessionId, date, totalTime, totalPause],
                    (err, results) => {
                        if (results.affectedRows > 0) {
                            //res.render("add", { mesg: true });
                            res.send(results);
                        }
                    }
                );
            }
        }
    });
});

//Create Server
app.listen(port, (err) => {
    if (err) throw err;
    else console.log("Server is running at port %d:", port);
});
