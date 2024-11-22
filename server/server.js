const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(cors());

const port = 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reactapp_db"
})


//add data
app.post("/add_student", (req, res) => {
    sql = "insert into students (name,gender,age,email) values (?,?,?,?)";
    const values = [
        req.body.name,
        req.body.gender,
        req.body.age,
        req.body.email
    ]

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: 'An error occured: ' + err })
        return res.json({ success: 'Added successfully' })
    })
})

//fetch data
app.get("/students", (req, res) => {
    const sql = "select * from students";

    db.query(sql, (err, result) => {
        if (err) return res.json({ message: 'An error occured: ' + err })
        return res.json(result)
    })
})


//fetch single data
app.get("/get_student/:id", (req, res) => {
    const id = req.params.id;
    const sql = "select * from students where id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: 'An error occured: ' + err })
        return res.json(result)
    })
})

//update data
app.post("/edit_student/:id", (req, res) => {
    const id = req.params.id;
    const sql = "update students set name=?, gender=?, age=?, email=? where id=?";
    const values = [
        req.body.name,
        req.body.gender,
        req.body.age,
        req.body.email,
        id
    ]

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: 'An error occured: ' + err })
        return res.json({ success: 'Updated successfully' })
    })
})


//delete data
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "delete from students where id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ message: 'An error occured: ' + err })
        return res.json({ success: 'Deleted successfully' })
    })
})



app.listen(port, () => {
    console.log('Server is running in port ' + port);
})