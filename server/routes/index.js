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
      connection.query("SELECT * FROM USERS WHERE USERNAME = ? AND PHARMACY_NAME = ?", [session.user.username, session.user.pharmacy], (err, result, fields) => {
        res.status(200).send({
          username: session.user.username,
          role: session.user.role,
          lastAccessedScreen: result[0].last_accessed,
          haveAccessTo : result[0].have_access_to,
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
  connection.query('SELECT * FROM USERS WHERE USERNAME = ? AND PASSWORD = ? AND PHARMACY_NAME = ?', [req.body.username, req.body.password, req.body.pharmacy ], (err, result, fields) => {
    if (result.length == 1) {
      session = req.session;
      var validatedUser = {
        username: result[0].username,
        role: result[0].role,
        lastAccessedScreen: result[0].last_accessed,
        pharmacy : result[0].pharmacy_name,
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
  connection.query('select * from users where username = ?', [req.body.username], (err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "danger",
        message : "Something went wrong"
      })
    }
    else if(result.length > 0) {
      res.status(200).send({
        status : "danger",
        message : "Username already exists"
      })

    } else {
    connection.query('INSERT INTO USERS (USERNAME, PASSWORD, ROLE, LAST_ACCESSED,EMAIL,MOBILE_NUMBER, PHARMACY_NAME,BRANCH_ID,have_access_to) VALUES (?,?,?,?,?,?,?,?,?)', [req.body.username, req.body.password, req.body.pharmacyName && req.body.pharmacyName.trim() !== '' ? 1 : 2, req.body.pharmacyName && req.body.pharmacyName.trim() !== '' ? 1 : 8,req.body.email, req.body.mobileNumber, req.body.pharmacyName,req.body.pharmacyName && req.body.pharmacyName.trim() !== '' ? 1 : '',req.body.pharmacyName && req.body.pharmacyName.trim() !== '' ? '[1],[2],[3],[4],[5],[6],[7],[8],[9]' : '[8]'], (err1, result1, fields1) => {
      if(err1) {
        res.status(200).send({
          status : "danger",
          message : "Something went wrong"
        })
      } else{
      res.status(200).send({
        status: 'success',
        message : "New User Created"
      });
    }
    })
  }
  })
})

app.get('/get-medicines',(req,res) => {
  connection.query('SELECT * FROM MEDICINES where added_by in (select u.username from users u where u.pharmacy_name = (select distinct us.pharmacy_name from users us where username = ?))',[session.user.username],(err,result,fields) => {
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
  connection.query('select count(mid) as total from medicines where username = ?',[session.user.username],(err, result, fields) => {
    sizeOfMed = result[0].total;
    
    var queryParam = [session.user.username,sizeOfMed + 1, req.body.medName, req.body.medCompany, req.body.medQuantity, req.body.medExpiryDate,req.body.medMrp, req.body.medRate, (req.body.medStatus === 'ACTIVE' ? '1' : '0'), session.user.username];
  
    connection.query("insert into medicines (username, mid, mname, mcompany, quantity, expiry_date, med_mrp, med_rate, status, added_by) values (?,?,?,?,?,?,?,?,?,?)", queryParam,(err, result, fields) => {
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
  if(!session) {
    res.status(403).send({
      status : "failed",
      message : "authentication failed"
    })
  }
  connection.query('UPDATE USERS SET LAST_ACCESSED = ? WHERE USERNAME = ? AND PHARMACY_NAME = ?', [req.body.lastAccessedScreen, session.user.username, session.user.pharmacy], (err, result, fields) => {
    res.send({message:"success"})
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
  connection.query('select medname, quantity, price, mid from cartitems where username = ? and pharmacy_name = ?', [session.user.username, session.user.pharmacy],(err, result, fields) => {
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
  connection.query('select username from users where username = ? and password = ? and pharmacy_name = ?', [session.user.username, req.body.oldPass, session.user.pharmacy],(err, result, fields) => {
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
      connection.query('update users set password = ? where username = ? and pharmacy_name = ?', [req.body.newPass, session.user.username, session.user.pharmacy],(err, result, fields) => {
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

app.post("/forgot-pass-change", (req,res) => {
  connection.query('update users set password = ? where username = ?', [req.body.newPass, req.body.username], (err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    else {
      res.status(200).send({
        status : "success",
        message : "Password Changed"
      })
    }
  })
})

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
  connection.query('select count(username) as total from cartitems where username = ? and pharmacy_name = ?', [session.user.username,session.user.pharmacy], (err, result, fields) => {
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

app.get('/get-invoices', (req, res) => {
  if(!session) {
    res.status(403).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  connection.query('select * from invoices where username = ?', [session.user.username], (err, result, fields) => {
    if(err) {
      console.log(err);
    }
    let resp = [];
    result.map((data) => {
      resp.push({
        username : session.user.username,
        pharmName : data.pharm_name,
        branch : data.branch,
        quantity : data.quantity,
        amount : data.amount,
        invoiceDate : data.invoice_date,
      });
    })
    res.status(200).send(resp);
  })
})

app.post('/post-invoice', (req,res) => {
  if(!session) {
    res.status(403).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  var queryParam = [session.user.username, req.body.pharmName, req.body.branch, req.body.quantity, req.body.amount];
   if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  connection.query('insert into invoices set username = ?, pharm_name = ?, branch = ?, quantity = ?, amount = ?, invoice_date = now()', queryParam, (err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    else {
      res.status(200).send({
        status : "success",
        message : "New Invoice inserted successfully"
      })
    }
  })
})

app.get('/get-delivery-men-details', (req,res) => {
  var query = 'select * from delivery_men';
  connection.query(query, (err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    else {
      let respData = [];
      result.map((data)=> {
        respData.push({
          name : data.username,
          email : data.email,
          mobileNumber : data.mobile_number,
          address : data.address,
          aadhar : data.aadhar_number,
        })
      })
      res.status(200).send(respData);
    }
  })
})

app.post('/post-delivery-man-details', (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  var queryParam = [req.body.name, req.body.email, req.body.mobileNumber, req.body.address, req.body.aadhar];
  connection.query('insert into delivery_men set username = ?, email = ?, mobile_number = ?, address = ?, aadhar_number = ?', queryParam, (err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    else {
      res.status(200).send({
        status : "success",
        message : "New Delivery Man details inserted successfully"
      })
    }
  })
})

app.get('/get-pharmacists-details', (req,res) => {
  var query = 'select * from pharmacists where added_by = ?';
  connection.query(query,[session.user.username], (err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    else {
      let respData = [];
      result.map((data)=> {
        respData.push({
          name : data.username,
          email : data.email,
          mobileNumber : data.mobile_number,
          address : data.address,
          aadhar : data.aadhar_number,
        })
      })
      res.status(200).send(respData);
    }
  })
})

app.post('/post-pharmacist-details', (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  connection.query('select count(*) as total from users where username = ?', [req.body.name], (err3, result3, fields3) => {
    if(err3)
    {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    } 
    else if(result3[0].total > 0) {
      res.status(200).send({
        status : "warning",
        message : "Username already exists"
      })
    }else {
      var queryParam = [req.body.name, req.body.email, req.body.mobileNumber, req.body.address, req.body.aadhar, session.user.username];
  connection.query('insert into pharmacists set username = ?, email = ?, mobile_number = ?, address = ?, aadhar_number = ?, added_by = ?', queryParam, (err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    else {
      var queryParam1 = [req.body.name, 'pharmacist', 3, 5, req.body.email,session.user.username,session.user.username, req.body.mobileNumber,'[5]'];
     connection.query('insert into users (username, password, role,last_accessed, email,pharmacy_name,branch_id, mobile_number, have_access_to) values (?,?,?,?,?,(select u.pharmacy_name from users u where username = ?),(select u.branch_id from users u where username = ?),?,?)',queryParam1,(err1, result1, fields1) => {
      if(err1) {
        res.status(200).send({
          status : "error",
          message : "Something went wrong"
        })
      }
      else {
      res.status(200).send({
        status : "success",
        message : "New Pharmacist details inserted successfully"
      })
    }
     })
    }
  })
    }
  })
})


app.post('/add-to-cart', (req,res) => {
  if(!session) {
    res.status(200).send({
      status : "error",
      message : "Authentication Failed"
    })
    return ;
  }
  let query = 'select count(*) as total from cartitems where username = ? and medname = ? and pharmacy_name = ?';
  let queryParam = [session.user.username, req.body.medName, session.user.pharmacy];

  connection.query(query, queryParam, (err, result, fields) => {
    if(err) {
      res.status(200).send({
        status : "error",
        message : "Something went wrong"
      })
    }
    else if(result[0].total > 0) {
      res.status(200).send({
        status : "warning",
        message : `${req.body.medName} is already in cart...`,
      })
    }
      else {
        let id = 1;
          connection.query('select count(*) as total from cartitems where username = ? and pharmacy_name = ?', [session.user.username,session.user.pharmacy], (err1, result1, fields1) => {
            if (err1) {
              res.status(200).send({
                status: "error",
                message: "Something went wrong"
              });
            }
            id = result1[0].total + 1;
            connection.query('insert into cartitems (mid, username, medname, quantity, price,pharmacy_name) values (?,?, ?, ?, (select m.med_rate from medicines m where m.mname = ?), ?)', [id.toString(), session.user.username, req.body.medName,req.body.quantity, req.body.medName, session.user.pharmacy], (err2, result2, fields2) => {
              if(err2) {
                res.status(200).send({
                  status : "error",
                  message : "Something went wrong"
                })
              }
              else {
              res.status(200).send({
                status : "success",
                message : `${req.body.medName} is added to Cart`
              })
            }
            })
          }); 
      }
    })
  })

app.get('/get-created-pharmacies', (req, res) => {
  connection.query('select distinct pharmacy_name from users order by pharmacy_name asc', (err, result, fields) => {
    let list = [];
    result.map((data) => {
      list.push(data.pharmacy_name);
    })
    res.status(200).send({
      status : "success",
      pharmacies : list,
    })
  })
})

module.exports = app;
