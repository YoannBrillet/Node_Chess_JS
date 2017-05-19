var connect;

function bdd(){
    var mysql      = require('mysql');
    connect = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'Node_Dames_BDD'
    });

    connect.connect(function(err){
        if(!err) {
            console.log("Database is connected ... ");
        } else {
            console.log("Error connecting database ...");
        }

    });
}

exports.bdd = bdd;
exports.connect = function () {
    return connect;
};
