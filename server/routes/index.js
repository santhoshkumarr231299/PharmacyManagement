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
        mid : mdata.mid,
        mname : mdata.mname,
        mcompany : mdata.mcompany,
        quantity : mdata.quantity,
        dateAdded : mdata.med_added_date,
        expiryDate : mdata.expiry_date,
        medMrp : mdata.med_mrp,
        medRate : mdata.med_rate,
        addedBy : mdata.added_by,
        status : ('1' === mdata.status ? 'ACTIVE' : 'INACTIVE'),
      });
    })
    res.status(200).send(data);
  });
})

app.post('/post-medicine', (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  var sizeOfMed = 0;
  connection.query('select count(mid) as total from medicines',(err, result, fields) => {
    sizeOfMed = result[0].total;
    
    var queryParam = [sizeOfMed + 1, req.body.medName, req.body.medCompany, req.body.medQuantity, req.body.medExpiryDate,req.body.medMrp, req.body.medRate, (req.body.medStatus === 'ACTIVE' ? '1' : '0'), session.user.username];
  
    connection.query("insert into medicines (mid, mname, mcompany, quantity, expiry_date, med_mrp, med_rate, status, added_by) values (?,?,?,?,?,?,?,?,?)", queryParam,(err, result, fields) => {
      console.log
      if(err) {
        res.status(200).send({
          status : "error",
          message : "Something went wrong"
        })
      }
      else {
        res.status(200).send({
          status : "success",
          message : "New Medicine Added Successfully"
        })
      }
    })
  })
 
});

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

app.post('/get-user-details', (req,res) => {
  connection.query('select *  from users where username = ?',[req.body.username], (err, result, fields) => {
    if(result) {
      res.status(200).send({
        username : result[0].username,
        email : result[0].email,
        mobileNumber : result[0].mobile_number,
        pharmacyName : result[0].pharmacy_name,
        branchId : result[0].branch_id,
        message : "success"
      })
    }
    else {
      res.status(200).send({
        username : '',
        message : "success"
      })
    }
  })
  
})

app.post('/get-search-medicines', (req,res) => {
  let tsearchWord = '%' + req.body.searchWord + '%';
  connection.query('select * from medicines where mname like ? order by mname limit 16' , [tsearchWord], (err, result, fields) => {
    let data = [];
    result.map((mdata) => {
      data.push({
        mid : mdata.mid,
        mname : mdata.mname,
        mcompany : mdata.mcompany,
        quantity : mdata.quantity,
        dateAdded : mdata.med_added_date,
        expiryDate : mdata.expiry_date,
        medMrp : mdata.med_mrp,
        medRate : mdata.med_rate,
        addedBy : mdata.added_by,
        status : ('1' === mdata.status ? 'ACTIVE' : 'INACTIVE'),
      });
    })
    res.status(200).send(data);
})
});

app.get('/get-cart-items', (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authorization failed"
    })
    return ;
  }
  connection.query('select medname, quantity, price, mid from cartitems where username = ?', [session.user.username],(err, result, fields) => {
    let data = [];
    let count = 1;
    result.map((item) => {
      data.push({
        id : count++,
        medName : item.medname,
        price : item.price,
        quantity : item.quantity,
        mid : item.mid
      })
    })
    res.status(200).send(data);
  })
})

app.post('/update-pass', (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  connection.query('select username from users where username = ? and password = ?', [session.user.username, req.body.oldPass],(err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    if(result.length == 0)
    {
      console.log(result);
      res.status(200).send({
        status : "warning",
        message : "Wrong Old Password"
      })
    }
    else {
      if(req.body.oldPass === req.body.newPass) {
        res.status(200).send({
          status : "warning",
          message : "New Password and Old Password are same"
        })
      }
      else {
      connection.query('update users set password = ? where username = ?', [req.body.newPass, session.user.username],(err, result, fields) => {
        if(err) {
          res.status(200).send({
            status : "error",
            message : "Something went wrong"
          })
          
        }
        else {
          res.status(200).send({
            status : "success",
            message : "New Password Updated Successfully"
          })
        }
    })
    }
  }
  });

});

app.post("/update-user-details", (req,res) => {
  if(!session || (session.user.username !== req.body.username)) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  var queryParam = [req.body.email, req.body.mobileNumber, req.body.branchId, session.user.username];
  connection.query('update users set email = ?, mobile_number = ?, branch_id = ?  where username = ?', queryParam ,(err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    else if(result.changedRows == 0) {
      res.status(200).send({
        status : "warning",
        message : "User Values are the same before"
      })
    }
    else {
      res.status(200).send({
        status : "success",
        message : "New User Values Updated successfully"
      })
    }
  });

})

app.get("/get-reports", (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  connection.query('select * from reports order by reported_date desc', [session.user.username],(err, result, fields) => {
    let data = [];
    let count = 0;
    result.map((report) => {
      data.push({
        id : count++,
        reportTitle : report.report_title,
        reportSubject : report.report_subject,
        reportDesc : report.report_desc,
        reportDate : report.reported_date,
        reportedBy : report.username,
        // role : report.role,
      })
    })
    console.log(result);
    res.status(200).send(data);
  })
});

app.post("/post-report", (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  var queryParam = [session.user.username, session.user.role, req.body.reportTitle, req.body.reportSubject,req.body.reportDesc];
  connection.query('insert into reports (username, role, report_title, report_subject, report_desc, reported_date) values (?,?,?,?,?,NOW())', queryParam,(err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    else {
      res.status(200).send({
        status : "success",
        message : "New User Values Updated successfully"
      })
    }
  })
})

app.get('/get-cart-items-count', (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  connection.query('select count(username) as total from cartitems where username = ?', [session.user.username], (err, result, fields) => {
    res.status(200).send({
      cartSize : result[0].total,
      message : 'success'
    })
  })
})

app.post('/update-cart-items', (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  connection.query('update cartitems set quantity = ? where username = ? and mid = ?', [req.body.newQuantity,session.user.username, req.body.mid], (err, result, fields) => {
    res.redirect('/get-cart-items');
  })
})

app.post('/delete-cart-items', (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  connection.query('delete from cartitems where username = ? and mid = ?', [session.user.username, req.body.mid], (err, result, fields) => {
    res.redirect('/get-cart-items');
  })
})

module.exports = app;
