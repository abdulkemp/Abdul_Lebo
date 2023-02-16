const express = require('express');
const path = require('path');
const db = require('./config');
const bodyParser = require('body-parser');
const port = parseInt(process.env.port) || 4000;
const app = express();
const route = express.Router();
app.use(
    route,
    express.json,
    bodyParser.urlencoded({extended: false})
)
route.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, './view/index.html'));
});

route.get('/user', function (req,res) {
    db.query('select * from Shoes', (err, data) => {
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).json( {results: data} )
        }
    });
});

route.post('/register',bodyParser.json(), (req, res) => {
    let detail = req.body;
    console.log(detail);
    const strQry =
    `INSERT INTO register
    SET?;`
    db.query(strQry, [detail], (err) => {
        if (err) {
         console.log(err);
        }
        else{
            res.status(200).json( {msg:"A user record was saved"} )
        }
    });
});

route.put('/user/:id', bodyParser.json(), (req, res) => {
    console.log(req.body);
    return res.json({
        message: 'blah blah',
    })
});

route.delete('/user/:id', bodyParser.json(), (req, res) => {
    const strQry =
    `DELETE FROM register
    WHERE  ?;`;
    db.query(strQry,[req.params.id],
        (err)=>{
            if (err)throw err;
            res.status(200).json({msg: "A record was removed from a database"})
        })
});

// route.patch('/login', bodyParser.json(),(req,res)=>{
//     const strQry=
//     `
//     SELECT firstName, lastName
//     `
// })
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})