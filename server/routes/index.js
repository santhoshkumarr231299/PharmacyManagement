var express = require('express');
var app = express();
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');

app.use(cookieParser())
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false,
  saveUninitialized: true,
  secret: "secret"
}))
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'PHARMACY_MANAGEMENT'
})

connection.connect();

var session = null;

app.get('/logged-in', (req, res) => {
  try {
    if (!session) {
      res.status(200).send({
        username: '',
        password: ''
      })
    }
    else {
      console.log(session.user.username);
      connection.query("SELECT * FROM USERS WHERE USERNAME = ?", [session.user.username], (err, result, fields) => {
        res.status(200).send({
          username: session.user.username,
          role: session.user.role,
          lastAccessedScreen: result[0].last_accessed,
        })
      });
    }
  }
  catch (e) {
    console.log(e);
    res.status(200).send({
      username: '',
      password: ''
    })
  }
})

app.post('/login', (req, res) => {
  connection.query('SELECT * FROM USERS WHERE USERNAME = ? AND PASSWORD = ?', [req.body.username, req.body.password], (err, result, fields) => {
    if (result.length == 1) {
      session = req.session;
      var validatedUser = {
        username: result[0].username,
        role: result[0].role,
        lastAccessedScreen: result[0].last_accessed,
        message: 'success'
      };
      session.user = validatedUser;
      session.save();
      console.log(`user logged in : `, validatedUser.username);
      res.status(200).send(validatedUser);
    }
    else {
      res.status(200).send({
        username: '',
        role: '',
        lastAccessedScreen: 0,
        message: 'failed'
      })
    }
  })
});

app.post('/new-user', (req, res) => {
  connection.query('INSERT INTO USERS (USERNAME, PASSWORD, ROLE, LAST_ACCESSED) VALUES (?,?,?,?)', [req.body.username, req.body.password, 1, 1], (err, result, fields) => {
    res.status(200).send({
      message: 'success'
    });
  })
})

app.get('/get-medicines',(req,res) => {
  connection.query('SELECT * FROM MEDICINES',(err,result,fields) => {
    let data = [];
    result.map((mdata) => {
      data.push({
        mname : mdata.mname,
        mcompany : mdata.mcompany,
      });
    })
    res.status(200).send(data);
  });
})

app.get('/logout', (req, res) => {
  session.destroy();
  session = null;
  res.status(200).send({
    message: 'success'
  })
});


app.get('/', function (req, res, next) {
  res.redirect('http://localhost:3001/');
});

app.post('/update-last-accessed', (req, res) => {
  connection.query('UPDATE USERS SET LAST_ACCESSED = ? WHERE USERNAME = ?', [req.body.lastAccessedScreen, req.body.username], (err, result, fields) => {
    // console.log(result);
  });
})

module.exports = app;
