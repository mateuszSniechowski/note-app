const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3306;
app.use(express.json());
app.use(cors());
dotenv.config();
  
app.get('/', (req, res) => res.json('My API is running!'));

const db = mysql.createConnection({
    host: process.env.HOST,
    user: 'admin',
    password: process.env.PASSWD,
    database: process.env.DATABSE_NAME,
});

db.connect((err) => {
    if(err){
        console.error("Error connecting to MySql", err);
        return;
    }
    console.log("Connected to MySql database");
});

app.get('/notes', (req, res) => {
    const q = "SELECT * FROM `notatka` LEFT JOIN dodatkoweInformacje ON dodatkoweInformacje.id = notatka.id";

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.post('/notes', (req, res) => {
    if(!req.body){
        return res.status(400).json("No data in post query!");
    }
    const title = req.body.title;
    const note = req.body.note;
    const date = req.body.date;
    const place = req.body.place;

    db.query("INSERT INTO notatka(temat, notatka) VALUES (?, ?)", [title, note], (err, data) => {
       if(err){
        db.rollback(() => {
            return res.status(500).json(err);
        });
       } else {
        const noteId = data.insertId;

    db.query("INSERT INTO dodatkoweInformacje(id, dataWydarzenia, miejsceWydarzenia) VALUES (?, ?, ?)",
            [noteId, date, place], (err, result) => {
                if(err){
                    db.rollback(() =>{
                        return res.status(500).json(err);
                    });
                } else {
                    db.commit((err) => {
                        if(err){
                            return res.status(500).json(err);
                        } 
                        return res.json("Note has been successfully added");
                    });
                }
            });
       }
    });
});


app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    
    db.query("DELETE FROM notatka WHERE id = " + id, (err, data) => {
        if(err){
            return res.status(500).json(err);
        }
        return res.json("Note has been successfully deleted");
    });
});


app.put('/notes/:id', (req, res) => {
    if(!req.body){
        return res.status(400).json("No data in post query!");
    }

    const noteId = req.params.id;

    const values = [
        req.body.title,
        req.body.note,
    ];

    db.query("UPDATE notatka SET `temat` = ?, `notatka` = ? WHERE `id` = ?", [...values, noteId], (err, data) => {
       if(err){
            db.rollback(() => {
                return res.status(500).json(err);
            });
       } else {

        const values = [
            req.body.date,
            req.body.place,
        ];

    db.query("UPDATE dodatkoweInformacje SET `dataWydarzenia` = ?, `miejsceWydarzenia` = ? WHERE `id` = ?",
            [...values, noteId], (err, result) => {
                if(err){
                    db.rollback(() =>{
                        return res.status(500).json(err);
                    });
                } else {
                    db.commit((err) => {
                        if(err){
                            return res.status(500).json(err);
                        } 
                        return res.json("Note has been successfully added");
                    });
                }
            });
       }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});