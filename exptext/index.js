// node引入包名
const iot = require('alibabacloud-iot-device-sdk');
const express = require('express');
var mysql = require('mysql');
const app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});

app.get('/user', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();
    //console.log('user');
    var sql = "SELECT * FROM user";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
/**
 * app
 */
app.get('/user/:userName', function (req, res) {
    const userName = req.params["userName"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();
    //console.log('user');
    var sql = "SELECT * FROM user where username ='" + userName + "' ";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
/**
 * 管理员登录
 */
app.post('/user', function (req, res) {
    req.on('data', function (data) {
        obj = JSON.parse(data);
        console.log(obj);
        //res.send('数据已接收');
        const username = obj.userName;
        const password = obj.password;

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'mydata'
        });
        connection.connect();

        let sql = "SELECT * from user where username ='" + username + "'";

        // 查询
        connection.query(sql, function (err, result) {
            // console.log(result);
            console.log("username=" + username + "password=" + password);
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send(JSON.stringify({
                    succ: false,
                    msg: '数据出错！'
                }));
                return;
            }
            else {
                if (result.length <= 0) {
                    res.send(JSON.stringify({
                        succ: false,
                        msg: '数据储存有误！'
                    }));
                } else {
                    for (let item of result) {
                        if (item.username == username && item.password == password) {
                            let sql2 = "UPDATE user SET status = " + 1 + " where username='" + username + "'";
                            connection.query(sql2, function (err, result) {
                                console.log(sql2);
                                res.send(JSON.stringify({
                                    succ: true,
                                    msg: 'Login success'
                                }));
                            });
                            connection.end();
                        } else {
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '用户名或密码错误！'
                            }))
                        }
                        return;
                    }
                }
            }
            console.log('------------------------------------------------------------\n\n');
        });


    });

});
/**
 * 用户登录(app)
 */
app.post('/user1', function (req, res) {
    req.on('data', function (data) {
        obj = JSON.parse(data);
        console.log(obj);
        //res.send('数据已接收');
        const username = obj.username;
        const password = obj.password;

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'mydata'
        });
        connection.connect();

        let sql = "SELECT * from user where username ='" + username + "'";

        // 查询
        connection.query(sql, function (err, result) {
            // console.log(result);
            console.log("username=" + username + "password=" + password);
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.send(JSON.stringify({
                    succ: false,
                    msg: '数据出错！'
                }));
                return;
            }
            else {
                if (result.length <= 0) {
                    res.send(JSON.stringify({
                        succ: false,
                        msg: '数据储存有误！'
                    }));
                } else {
                    for (let item of result) {
                        if (item.username == username && item.password == password) {
                            let sql2 = "UPDATE user SET phone_status = " + 1 + " where username='" + username + "'";
                            connection.query(sql2, function (err, result) {
                                console.log(sql2);
                                res.send(JSON.stringify({
                                    succ: true,
                                    msg: 'Login success'
                                }));
                            });
                            connection.end();
                        } else {
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '用户名或密码错误！'
                            }))
                        }
                        return;
                    }
                }
            }
            console.log('------------------------------------------------------------\n\n');
        });


    });

});
/**
 * 管理员注册
 */
app.post('/user2/:userId/:userName/:password/:sex/:phone', function (req, res) {
    // 1) 获取参数路由的参数
    const userId = req.params["userId"];
    const username = req.params["userName"];
    const password = req.params["password"];
    const sex = req.params["sex"];
    const phone = req.params["phone"];
    console.log("username=" + username + "password=" + password);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句

    let sql = "SELECT * from user where userId ='" + userId + "' and  username ='" + username + "' ";

    // 查询
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);
        console.log("username=" + username + "password=" + password);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                if (item.userId === userId && item.username === username) {
                    res.send(JSON.stringify({
                        succ: false,
                        msg: '用户名已存在'
                    }));
                    isExists = true;
                    return;
                }
            }

            if (!isExists) {
                let sql2 = "INSERT INTO user(userId,username,password,sex,phone,status) values ('" + userId + "','" + username + "','" + password + "','" + sex + "','" + phone + "','" + 0 + "')";
                connection.query(sql2, function (err, result) {
                    console.log(sql2);
                    // 5) 成功和失败的处理
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        res.send(JSON.stringify({
                            succ: false,
                            msg: '添加失败!'
                        }));
                        return;
                    }
                    res.send(JSON.stringify({
                        succ: true,
                        msg: '添加成功！'
                    }));
                });
                connection.end();
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});
/**
 * 用户注册(app)
 */
app.post('/user3/:userName/:password/:sex/:phone', function (req, res) {
    // 1) 获取参数路由的参数
    const username = req.params["userName"];
    const password = req.params["password"];
    const sex = req.params["sex"];
    const phone = req.params["phone"];
    console.log("username=" + username + "password=" + password);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句

    let sql = "SELECT * from user where   username ='" + username + "' ";

    // 查询
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);
        console.log("username=" + username + "password=" + password);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                if (item.username === username) {
                    res.send(JSON.stringify({
                        succ: false,
                        msg: '用户名已存在'
                    }));
                    isExists = true;
                    return;
                }
            }

            if (!isExists) {
                let sql2 = "INSERT INTO user(username,password,sex,phone,status) values ('" + username + "','" + password + "','" + sex + "','" + phone + "','" + 0 + "')";
                connection.query(sql2, function (err, result) {
                    console.log(sql2);
                    // 5) 成功和失败的处理
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        res.send(JSON.stringify({
                            succ: false,
                            msg: '添加失败!'
                        }));
                        return;
                    }
                    res.send(JSON.stringify({
                        succ: true,
                        msg: '添加成功！'
                    }));
                });
                connection.end();
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});
/**
 * 查找用户(app)
 */
app.post('/user4/:userName', function (req, res) {
    // 1) 获取参数路由的参数
    const userName = req.params["userName"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select * from user where username='" + userName + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '找到用户！'
        }));
    });


});
/**
 * 修改(app)
 */
app.post('/updateUser/:username/:password/:phone', function (req, res) {
    // 1) 获取参数路由的参数
    const username = req.params["username"];
    const password = req.params["password"];
    const phone = req.params["phone"];
    console.log("username=" + username + "password=" + password);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句

    let sql = "SELECT * from user where username ='" + username + "'";

    // 查询
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);
        console.log("username=" + username + "password=" + password);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.username === username) {
                    let sql2 = "UPDATE user SET password = '" + password + "', phone = '" + phone + "' where username='" + username + "'";
                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '更新失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            msg: '更新成功！'
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '用户不存在'
                }));
                return;

            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});
/**
 * 退出
 */
app.post('/Logout/:userName', function (req, res) {
    const username = req.params['userName'];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });
    connection.connect();

    let sql = "SELECT * from user where username ='" + username + "'";

    // 查询
    connection.query(sql, function (err, result) {
        // console.log(result);
        console.log("username=" + username);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            for (let item of result) {
                if (item.username == username) {
                    let sql2 = "UPDATE user SET status = " + 0 + " where username='" + username + "'";
                    connection.query(sql2, function (err, result) {
                        // console.log(err);
                        // console.log(result);
                        // console.log(sql2);
                        res.send(JSON.stringify({
                            succ: true,
                            msg: 'Logout success'
                        }));
                    });

                    connection.end();

                }
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});
/**
 * 注销
 */
app.post('/user/:userName', function (req, res) {
    // 1) 获取参数路由的参数
    const username = req.params["userName"];
    console.log("username=" + username);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    let sql = "Delete from user where username ='" + username + "'";
    const delCallback = function (err, result) {
        // 5) 成功和失败的处理
        if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '删除失败!'
            }));
            return;
        }
        res.send(JSON.stringify({
            succ: true,
            msg: '删除成功！'
        }));
    }
    // 4) 调用SQL语句
    connection.query(sql, delCallback);
    console.log(sql);
});
/**
 * 信息修改
 */
app.post('/upuser/:userId/:userName/:password/:sex/:phone', function (req, res) {
    // 1) 获取参数路由的参数
    const userId = req.params["userId"];
    const username = req.params["userName"];
    const password = req.params["password"];
    const sex = req.params["sex"];
    const phone = req.params["phone"];
    //  console.log("username=" + username + "usename=" + usename);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select * from user where userId='" + userId + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.userId === userId) {
                    let sql2 = "UPDATE user SET username = '" + username + "',password = '" + password + "',sex = '" + sex + "',phone = '" + phone + "' where userId='" + userId + "' ";
                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '更新失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            msg: '更新成功！'
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '用户不存在'
                }));
                return;

            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});



/**
 * 查询
 */
app.post('/selectUser/:userId/:user', function (req, res) {
    // 1) 获取参数路由的参数
    const userId = req.params["userId"];
    const user = req.params["user"];
    console.log("userId=" + userId);
    console.log("user=" + user);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select *from  user  where  username='" + user + "' ";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.userId === userId || item.username === user) {
                    var sql2 = "select *from user where  username='" + user + "' ";
                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[SELECT ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '查询失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            resp: result,
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '用户不存在'
                }));
                return;
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});

/**
 * 删除
 */
app.post('/delectUser/:user', function (req, res) {
    const user = req.params["user"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select *from  user  where  username='" + user + "' ";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);
        console.log("username=" + user);
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.username === user) {
                    let sql2 = "Delete from user where username ='" + user + "'";
                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[DELECT ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '删除失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            msg: '删除成功！'
                        }));
                    });
                    connection.end();
                }
            }
        }

        if (!isExists) {
            res.send(JSON.stringify({
                succ: false,
                msg: '用户名不存在'
            }));
        }
        return;
        console.log('------------------------------------------------------------\n\n');
    });
});
/**
 * 修改设备
 */
app.post('/UPDATE/:id/:devName/:status/:customer_status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const name = req.params["devName"];
    const status = req.params["status"];
    const customer_status = req.params["customer_status"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select * from led where id='" + id + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.id === id) {
                    let sql2 = "UPDATE led SET name = '" + name + "',status = " + status + ",customer_status = " + customer_status + " where id='" + id + "'";

                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '更新失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            msg: '更新成功！'
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '设备不存在'
                }));
                return;

            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});

/**
 * 获取会议室数据
 */
app.get('/meet', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();
    //console.log('user');
    var sql = "SELECT * FROM meetingroom";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

/**
 * 会议室的创建
 */
app.post('/addmeet/:id/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const status = req.params["status"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    let sql = "SELECT * from meetingroom where meet_num ='" + id + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                if (item.meet_num === id) {
                    res.send(JSON.stringify({
                        succ: false,
                        msg: '会议室已存在'
                    }));
                    isExists = true;
                    return;
                }
            }

            if (!isExists) {
                let sql2 = "INSERT INTO meetingroom(meet_num,status) VALUES('" + id + "','" + status + "')";
                connection.query(sql2, function (err, result) {
                    console.log(sql2);
                    // 5) 成功和失败的处理
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        res.send(JSON.stringify({
                            succ: false,
                            msg: '添加失败!'
                        }));
                        return;
                    }
                    res.send(JSON.stringify({
                        succ: true,
                        msg: '添加成功！'
                    }));
                });
                connection.end();
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});

/**
 * 会议室的查询
 */
app.post('/selectMeet/:search', function (req, res) {
    // 1) 获取参数路由的参数
    const search = req.params["search"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select * from meetingroom where meet_num='" + search + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.meet_num === search) {
                    var sql2 = "select *from meetingroom  where meet_num ='" + search + "'";
                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '查询失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            resp: result,
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '设备不存在'
                }));
                return;
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});

/**
 * 会议室设备匹配
 */
app.post('/selMeet/:search', function (req, res) {
    // 1) 获取参数路由的参数
    const meet_num = req.params["search"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select * from device where meet_num='" + meet_num + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '设备出错!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            result: result
        }));
    });


});
/**
 * 已预约的会议室
 */
app.get('/mets', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();
    //console.log('user');
    var sql = "SELECT * FROM meetingroom where status = '1'";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

/**未预约的会议室 */
app.get('/met', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();
    //console.log('user');
    var sql = "SELECT * FROM meetingroom where status = '0'";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
/**
 * 删除会议室
 */
app.post('/delMeet/:met_num', function (req, res) {
    const met_num = req.params['met_num'];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();
    var sql = "select * from meetingroom where meet_num='" + met_num + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.meet_num === met_num) {
                    var sql2 = "Delete from meetingroom where meet_num='" + met_num + "'";
                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '删除失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            msg: '删除成功！'
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '设备不存在'
                }));
                return;
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });

});

/**
 * 修改会议室状态（app）
 */
app.post('/updateMeet/:meet_num', function (req, res) {
    // 1) 获取参数路由
    const meet_num = req.params["meet_num"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select * from meetingroom  where meet_num ='" + meet_num + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.meet_num === meet_num) {
                    let sql2 = "UPDATE meetingroom SET status = '1' where meet_num='" + meet_num + "'";

                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '更新失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            msg: '更新成功！'
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '设备不存在'
                }));
                return;

            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});

/**
 * 预约、取消预约会议室
 */
app.post('/meetingroom/:meet_num/:status/:userName', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["meet_num"];
    const status = req.params["status"];
    const user = req.params["userName"];
    console.log(user, id, status);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "UPDATE meetingroom SET status = " + status + " where meet_num='" + id + "'";

    console.log(sql);

    // 4) 调用SQL语句


    let InsertCallback = function (err, result) {
        if (err) {
            console.log('[INERST ERROR] - ', err.message);
            res.send('插入失败!');
            return;
        }
    };
    let updateCallback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));
        let sql2 = " INSERT INTO message(user,meet_num,status,time) values ('" + user + "','" + id + "','" + status + "',now())";

        connection.query(sql2, InsertCallback);
        connection.end();

    };

    connection.query(sql, updateCallback);

});


app.get('/meetingroom', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    var sql = "SELECT * FROM meetingroom ";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
/*获取message数据*/
app.get('/message', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    var sql = "SELECT * FROM message ORDER BY id DESC limit 5";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});
//后台数据获取
app.get('/messages', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    var sql = "SELECT * FROM message";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

//清空数据
app.post('/cleanAllmessage', function (req, res) {
    //连接数据库
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句

    var sql = "Truncate table message";
    //console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '清空失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '清空成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

/**
 * device
 */
app.get('/device/:Meet_num', function (req, res) {
    const meet_num = req.params["Meet_num"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();
    //console.log('led');
    var sql = "SELECT * FROM device where meet_num='" + meet_num + "' ";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.put('/device/:id/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    let sql = 'UPDATE device SET status=' + status
        + ' WHERE id = \'' + id + '\'';
    //console.log(sql);
    /**
     * 查询方法
     */
    const queryCallback = function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        const obj = {
            id: id,
            status: result[0].customer_status
        }
        res.send(JSON.stringify(obj));
    };
    /**
     * 修改方法
     */
    const updateCallback = function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send('修改失败!');
            return;
        }

        let sql2 = "SELECT * FROM device WHERE id='" + id + "'";
        connection.query(sql2, queryCallback);
        connection.end();
    };
    connection.query(sql, updateCallback);
});

app.post('/device/:id/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const status = req.params["status"];
    console.log(status);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "UPDATE device SET status = " + status
        + ",customer_status = " + status + " where id='" + id + "'";
    console.log(sql);
    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/addDevice/:id/:name/:meet_num', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const name = req.params["name"];
    const meet_num = req.params["meet_num"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    let sql = "SELECT * from device where id ='" + id + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                if (item.id === id) {
                    res.send(JSON.stringify({
                        succ: false,
                        msg: '设备已存在'
                    }));
                    isExists = true;
                    return;
                }
            }

            if (!isExists) {
                let sql2 = "INSERT INTO device VALUES('" + id + "','" + name + "', 0, 0, '" + meet_num + "')";

                connection.query(sql2, function (err, result) {
                    console.log(sql2);
                    // 5) 成功和失败的处理
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        res.send(JSON.stringify({
                            succ: false,
                            msg: '添加失败!'
                        }));
                        return;
                    }
                    res.send(JSON.stringify({
                        succ: true,
                        msg: '添加成功！'
                    }));
                });
                connection.end();
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});

app.post('/updateDevice/:id/:devName/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const name = req.params["devName"];
    const status = req.params["status"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select * from device where id='" + id + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.id === id) {
                    let sql2 = "UPDATE device SET  name = '" + name + "',status = " + status + ",customer_status = " + status + " where id='" + id + "'";

                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '更新失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            msg: '更新成功！'
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '设备不存在'
                }));
                return;

            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});

app.post('/deleteDevice/:id/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const name = req.params["name"];
    const status = req.params["status"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select * from device where id='" + id + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.id === id) {
                    var sql2 = "Delete from device where id='" + id + "'";
                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '删除失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            msg: '删除成功！'
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '设备不存在'
                }));
                return;
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});

app.post('/selectDevice/:id/:status', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    // const name = req.params["name"];
    const status = req.params["status"];
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata'
    });

    connection.connect();

    // 3) 生成SQL语句
    var sql = "select * from device where id='" + id + "'";
    connection.query(sql, function (err, result) {
        console.log(result);
        console.log(sql);

        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '数据出错！'
            }));
            return;
        }
        else {
            let isExists;
            for (let item of result) {
                isExists = true;
                if (item.id === id) {
                    var sql2 = "select *from device where id='" + id + "'";
                    connection.query(sql2, function (err, result) {
                        console.log(sql2);
                        // 5) 成功和失败的处理
                        if (err) {
                            console.log('[UPDATE ERROR] - ', err.message);
                            res.send(JSON.stringify({
                                succ: false,
                                msg: '查询失败!'
                            }));
                            return;
                        }
                        res.send(JSON.stringify({
                            succ: true,
                            resp: result,
                        }));
                    });
                    connection.end();
                }
            }

            if (!isExists) {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '设备不存在'
                }));
                return;
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });
});

/**
 * humiture
 */
app.get('/humiture', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();
    // console.log('humiture');
    var sql = "SELECT temp,humd,time from humiture ORDER BY id DESC LIMIT 1;"
    //var sql = "SELECT * FROM humiture";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.get('/humiture1', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();
    // console.log('humiture');
    var sql = "SELECT * FROM humiture";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.get('/humiture/:id/:temp/:humd', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();
    console.log('ht');
    var sql = "SELECT * FROM humiture";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

//清空数据
app.post('/cleanAllHum', function (req, res) {
    //连接数据库
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句

    var sql = "Truncate table humiture";
    //console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '清空失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '清空成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/humiture/:id/:temp/:humd', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const temp = req.params["temp"];
    const humd = req.params["humd"];
    console.log(temp);
    console.log(humd);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句

    var sql = "INSERT INTO humiture(id,temp,humd,time) VALUES( '" + id + "'," + temp + "," + humd + ", now())";
    //console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '添加失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '添加成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

/**
 * 光照度
 */
app.get('/env', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();
    // console.log('humiture');
    var sql = "SELECT light,time from env ORDER BY id DESC LIMIT 1;"
    //var sql = "SELECT * FROM humiture";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.get('/env1', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    var sql = "SELECT * FROM env";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.get('/env/:id/:light', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();
    console.log('env');
    var sql = "SELECT * FROM env";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

//清空数据
app.post('/cleanAllEnv', function (req, res) {
    //连接数据库
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句

    var sql = "Truncate table env";
    //console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '清空失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '清空成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/env/:id/:light', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const light = req.params["light"];

    console.log(light);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句

    var sql = "INSERT INTO env(id,light,time) VALUES('" + id + "'," + light + ", now())";
    //console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '插入失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '插入成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

/**
 * 烟雾浓度
 */
app.get('/env2', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    var sql = "SELECT pM,o2,time from env2 ORDER BY id DESC LIMIT 1;"

    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.get('/env21', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();
    // console.log('humiture');
    var sql = "SELECT * FROM env2";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.get('/env2/:id/:pM/:o2', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();
    console.log('env2');
    var sql = "SELECT * FROM env2";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

//创建iot.device对象将会发起到阿里云IoT的连接
const env2 = iot.device({
    "ProductKey": "a1GqBYCS9kE",
    "DeviceName": "light",
    "DeviceSecret": "ue7remiJZLBgfyA5O2FkRKFr2RvvbQcd"
});
//监听connect事件
env2.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    env2.subscribe('/a1GqBYCS9kE/light/user/get');
    console.log('connect successfully!');
    env2.publish('/a1GqBYCS9kE/light/user/update', 'hello world!');
});
//监听message事件
env2.on('message', (topic, payload) => {
    //console.log(topic, payload.toString());
});

//创建iot.device对象将会发起到阿里云IoT的连接
const env22 = iot.device({
    "ProductKey": "a1GqBYCS9kE",
    "DeviceName": "yanwu",
    "DeviceSecret": "T5sJP5kBQPERNOrzEaDaDi1vf8o2gykB"
});
//监听connect事件
env22.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    env22.subscribe('/a1GqBYCS9kE/yanwu/user/get');
    console.log('connect successfully!');
    env22.publish('/a1GqBYCS9kE/yanwu/user/update', 'hello world!');
});
//监听message事件
env22.on('message', (topic, payload) => {
    // console.log(topic, payload.toString());
});

//创建iot.device对象将会发起到阿里云IoT的连接
const env222 = iot.device({
    "ProductKey": "a1GqBYCS9kE",
    "DeviceName": "turangyangfen",
    "DeviceSecret": "ZprWwUAeJaGPjTWxz1E5CvfmFi0k6Y6T"
});
//监听connect事件
env222.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    env222.subscribe('/a1GqBYCS9kE/turangyangfen/user/get');
    console.log('connect successfully!');
    env222.publish('/a1GqBYCS9kE/turangyangfen/user/update', 'hello world!');
});
//监听message事件
env222.on('message', (topic, payload) => {
    // console.log(topic, payload.toString());
});
app.put('/env2/:id/:yw/:gz/:yf', function (req, res) {
    const id = req.params["id"];
    const yw = req.params["yw"];
    const gz = req.params["gz"];
    const yf = req.params["yf"];
    const t = Number(yw);
    const g = Number(gz);
    const y = Number(yf);


    //上报设备属性
    env2.postProps({
        Light: t
    }, (res) => {
        console.log(res);
        console.log(t);
    });

    res.send(JSON.stringify({
        id: id,
        status: ywState
    }));

    //上报设备属性
    env22.postProps({
        Light: g
    }, (res) => {
        console.log(res);
        console.log(g);
    });

    // res.send(JSON.stringify({
    //     id: id,
    //     status: gzState
    // }));

    //上报设备属性
    env222.postProps({
        Light: y
    }, (res) => {
        console.log(res);
        console.log(y);
    });

    // res.send(JSON.stringify({
    //     id: id,
    //     status: yfState
    // }));
});

var ywState = 0;

// 监听云端设置属性服务消息，示例代码为一个灯
env2.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'Light') { //判断是否设置的是LightSwitch属性
            //  console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            ywState = cmd.params.Light;
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            env2.postProps({ 'Light': ywState });
        }
    }
});

var gzState = 0;

// 监听云端设置属性服务消息，示例代码为一个灯
env22.onProps((cmd) => {
    // console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'Light') { //判断是否设置的是LightSwitch属性
            //    console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            gzState = cmd.params.Light;
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            env22.postProps({ 'LIght': gzState });
        }
    }
});


var yfState = 0;

// 监听云端设置属性服务消息，示例代码为一个灯
env222.onProps((cmd) => {
    //  console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'Light') { //判断是否设置的是LightSwitch属性
            // console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            yfState = cmd.params.Light;
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            env222.postProps({ 'Light': yfState });
        }
    }
});

//清空数据
app.post('/cleanAllEnv2', function (req, res) {
    //连接数据库
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句

    var sql = "Truncate table env2";
    //console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '清空失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '清空成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/env2/:id/:pM/:o2', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const pM = req.params["pM"];
    const o2 = req.params["o2"];


    console.log(o2);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句

    var sql = "INSERT INTO env2(id,pM,o2,time) VALUES('" + id + "'," + pM + "," + o2 + ", now())";
    //console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '插入失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '插入成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

/**
 * yw
 */
app.get('/env3', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();
    // console.log('humiture');
    var sql = "SELECT yw,time from env3 ORDER BY id DESC LIMIT 1;"
    //var sql = "SELECT * FROM humiture";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.get('/env31', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    var sql = "SELECT * FROM env3";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});

app.get('/env3/:id/:yw', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();
    console.log('env3');
    var sql = "SELECT * FROM env3";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});


//创建iot.device对象将会发起到阿里云IoT的连接
const PH = iot.device({
    "ProductKey": "a1FV0WcIe72",
    "DeviceName": "pHjiance",
    "DeviceSecret": "HfZ63FnUb1xMEX3X82YfLlLUEXv1ivvZ"
});
//监听connect事件
PH.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    PH.subscribe('/a1FV0WcIe72/pHjiance/user/get');
    console.log('connect successfully!');
    PH.publish('/a1FV0WcIe72/pHjiance/user/update', 'hello world!');
});
//监听message事件
PH.on('message', (topic, payload) => {
    //  console.log(topic, payload.toString());
});

app.put('/env3/:id/:yw', function (req, res) {
    const id = req.params["id"];
    const pH = req.params["pH"];
    const p = Number(pH);

    // 上报设备属性
    PH.postProps({
        PH: p
    }, (res) => {
        console.log(res);
        console.log(p);
    });

    res.send(JSON.stringify({
        id: id,
        status: pHState
    }));
});

var pHState = 0;

// 监听云端设置属性服务消息，示例代码为一个灯
PH.onProps((cmd) => {
    // console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'CurrentTemperature') { //判断是否设置的是LightSwitch属性
            //  console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            pHState = cmd.params.CurrentTemperature;
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            PH.postProps({ 'CurrentTemperature': pHState });
        }
    }
});

//清空数据
app.post('/cleanAllEnv3', function (req, res) {
    //连接数据库
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句

    var sql = "Truncate table env3";
    //console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '清空失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '清空成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});

app.post('/env3/:id/:yw', function (req, res) {
    // 1) 获取参数路由的参数
    const id = req.params["id"];
    const yw = req.params["yw"];

    console.log(yw);
    // 2) 设置数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mydata',
        dateStrings: true
    });

    connection.connect();

    // 3) 生成SQL语句

    var sql = "INSERT INTO env3(id,yw,time) VALUES('" + id + "'," + yw + ", now())";
    //console.log(sql);

    // 4) 调用SQL语句
    let callback = function (err, result) {
        // 5) 回调函数处理
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '插入失败!'
            }));
            return;
        }

        res.send(JSON.stringify({
            succ: true,
            msg: '插入成功！'
        }));
    };

    connection.query(sql, callback);
    connection.end();
});


app.use(express.static('dist'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));