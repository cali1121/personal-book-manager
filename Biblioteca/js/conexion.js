let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    database: 'gestor',
    user: 'root',
    password: ''
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;