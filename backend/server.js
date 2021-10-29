const express = require("express");
var bodyParser = require('body-parser')
var mysql = require('mysql')
var cors = require('cors');
var multer  = require('multer');
const app = express();
app.use(cors());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mini_project',
    multipleStatements:true
})
connection.connect(function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("Connected...")
    }
})
app.use(bodyParser.urlencoded({extended:true})) 
app.use(bodyParser.json())
app.get("/about",function(req,res){
    var query='select * from users'
    connection.query(query,function(err,results){
        if(err){
            res.send(err)
        }
        else{
            res.send(results)
            //console.log(rows)
        }
        
    })  
    
    console.log("Running....")
})
app.get("/profile/:name",function(req,res){
    console.log(req.params)
    var query = "select path from users where name=?"
    connection.query(query,[req.params.name],function(err,results){
        if(err){
            res.send(err)
        }
        else{
            res.send(results)
        }
    })
})
app.get("/dashbaord/course",function(req,res){
    var allData = [];
    var query = "select * from admincoursedetail;select * from offers";
    connection.query(query,function(err,results){
        if(err){
            res.send(err)
        }
        else{
            allData.push(results[0]);
            allData.push(results[1]);
            res.send(allData)
        }
    });
    // var queryoffer = "select * from offers";
    // connection.query(queryoffer,function(err,results){
    //     if(err){
    //         res.send(err)
    //     }
    //     else{
    //         res.send(results)
    //         allData.push(results)
    //     }
    // });
})
app.post("/login",function(req,res){
    var name = req.body.name;
    var pass= req.body.password
    //console.log(name)
    var sql = `SELECT * FROM all_users WHERE UserName = ? limit 1`;
    connection.query(sql, [name], function (err, result,rows) {
    if(err){
        res.send(err)
    }else{
        //console.log(result.length)
        if(result.length>0){
            var sql = `SELECT * FROM all_users WHERE UserName = ? and UserPass= ? limit 1`;
            connection.query(sql, [name,pass], function (err, result,rows) {
                if(err){
                    res.send(err)
                }else{
                    //res.send("success")
                    console.log(result.length)
                    if(result.length>0){
                        //console.log()
                        res.send(result);
                    }else{
                        res.send("Incorrect Password")
                    }
                }
            })
        }
        else if(result.length==0){
            res.send("Incorrect Username");
        }
      
    }
    
    })
    // var query = "insert into users(name,email) values ('"+req.body.name+"','"+req.body.email+"')"
    // connection.query(query,function(err){
    //     if(err){
    //         res.send(err)
    //     }else{
    //         res.send('Inserted')
    //     }
    // })
    //res.send('POST request to the homepage')
})
app.post("/register",function(req,res){
    var name = req.body.name;
    var role= req.body.radio_check;
    var password = req.body.password;
    var isexistqry = 'select * from all_users where UserName = ? and UserRole = ? and UserPass = ?';
    connection.query(isexistqry, [name,role,password], function (err, result,rows) {
        if(err){
            res.send(err)
        }else{
            //console.log(result.length);
            if(result.length>0){
              res.send("exists");  
            }
            else{
                var insertuser = "insert into all_users(UserName,UserEmail,UserPass,UserRole) values ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"','"+req.body.radio_check+"')";
                connection.query(insertuser,function(err){
                        if(err){
                            res.send(err)
                        }else{
                            res.send('Success');
                        }
                    })
            }
        }
    })
})
app.post("/about",function(req,res){
    console.log(req.body.length)
    var arr=[]
    for(var i=0;i<req.body.length;i++){ 
        var arr_1=[]; 
    var query = 'insert into users(name,email) values ?';
    //var data = req.body[i].name+','+req.body[i].email;
    arr_1.push(req.body[i].name);
    arr_1.push(req.body[i].email);
    //arr_1.push(data)
    arr.push(arr_1)
    }
    connection.query(query,[arr],function(err){
            if(err){
                res.send(err)
            }else{
                console.log("inserted")
                res.send('Inserted')
            }
    })
    //console.log(arr)
    // let query = '';
    // for(var i=0;i<req.body.length;i++) {
    //         query += 'INSERT INTO users (name,email) VALUES ('+mysql.escape(req[i].body.name)+','+mysql.escape(req[i].body.email)+');';
    // }
    // console.log(query)
})
app.put("/about",function(req,res){
    // console.log(req.body)
    // console.log(req.body[0].email);
    // console.log(req.body.name);
    var query = 'update users set name=?,email=? where id=?';
    connection.query(query,[req.body[0].name,req.body[0].email,req.body[0].id],function(err){
        if(err){
            res.send(err)
        }else{
            //console.log("Updated")
            res.send('updated')
        }
    })
})
app.delete("/about/:id",function(req,res){
    //console.log(req.params.id)
    var query = 'delete from users where id=?';
    connection.query(query,[req.params.id],function(err){
        if(err){
            res.send(err)
        }else{
            res.send('Deleted Successfully')
        }
})
})
var storageCourse = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/Users/Imaran/myfirstreact/src/practical/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
var uploadCorse = multer({ storage: storageCourse }).single('photo')
app.post('/addcourse',function(req,res){
    uploadCorse(req,res,function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log(req);
            var ischeck = "select * from admincoursedetail where CourseName=?";
            connection.query(ischeck,[req.body.course],function(err,result,rows){
                if(err){
                    res.send(err);
                }
                else{
                    if(result.length>0){
                        res.send("Exist")
                    }else{
                        var query = "insert into admincoursedetail (CourseName,CourseFee,course_photo,courseDetail) values ('"+req.body.course+"','"+req.body.fee+"','"+req.file.filename+"','"+req.body.deatil+"')";
                        connection.query(query,function(err){
                            if(err){
                                res.send(err)
                            }else{
                                //console.log("Updated")
                                res.send('Added successfully');
                            }
                        })
                    }
                }
            })
            //console.log(req.file.filename)
            //res.send("uploaded sucessfully")
        }
    })
})
var storageoffer = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/Users/Imaran/myfirstreact/src/practical/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
var uploadoffers = multer({ storage: storageoffer }).single('offers')
app.post('/addoffers',function(req,res){
    uploadoffers(req,res,function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log(req);
            var ischeck = "select * from offers where Offername=?";
            connection.query(ischeck,[req.body.offer],function(err,result,rows){
                if(err){
                    res.send(err);
                }
                else{
                    if(result.length>0){
                        res.send("Exist")
                    }else{
                        var query = "insert into offers (Offername,OfferDetail,validity,Discount,path) values ('"+req.body.offer+"','"+req.body.detail+"','"+req.body.date+"','"+req.body.fee+"','"+req.file.filename+"')";
                        connection.query(query,function(err){
                            if(err){
                                res.send(err)
                            }else{
                                //console.log("Updated")
                                res.send('Added successfully');
                            }
                        })
                    }
                }
            })
            //console.log(req.file.filename)
            //res.send("uploaded sucessfully")
        }
    })
})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/Users/Imaran/myfirstreact/src/practical/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.mp4')
    }
  })
   
var upload = multer({ storage: storage }).single('video')
app.post('/uploads', function (req, res) {
    upload(req,res,function(err){
        //console.log(req.body.name)
        if(err){
            console.log(err)
        }
        else{
            console.log(req);
            var query = "insert into videos(Coursename,VideoName,url) values('"+req.body.course+"','"+req.body.name+"','"+req.file.filename+"')";
            connection.query(query,function(err){
                if(err){
                    res.send(err)
                }else{
                    //console.log("Updated")
                    res.send('success')
                }
            })
            //console.log(req.file.filename)
            //res.send("uploaded sucessfully")
        }
    })
})
app.post('/usercourse',function(req,res){
    var isExist = 'select * from usercoursedetail where UserID=? and CourseID=?';
    connection.query(isExist,[req.body.userid,req.body.courseid],function(err,results){
        if(err){
            res.send(err);
        }
        else{
            if(results.length==0){
                var query = "insert into usercoursedetail(UserID,CourseID) values ('"+req.body.userid+"','"+req.body.courseid+"')";
                connection.query(query,function(err){
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send('Course Added Successfully');
                    }
                })
            }
            else{
                res.send('Exists')
            }
        }
    })
})
app.get('/mycourse/:id',function(req,res){
    var query = 'select a.CourseID as id,b.CourseName as name from usercoursedetail as a,admincoursedetail as b where a.CourseID=b.CourseID and a.UserID=?';
    connection.query(query,[req.params.id],function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result)
        }
    })
})
app.get('/myvideo/:cname',function(req,res){
    console.log(req.params.cname)
    var query = 'select * from videos where Coursename=?'
    connection.query(query,[req.params.cname],function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
//connection.end() 
app.listen(8001)