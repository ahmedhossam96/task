var amqp = require('amqplib/callback_api');


connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });


  let config = {
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'users'
  };
  
  module.exports = config;

  let mysql  = require('mysql');
 //let config = require('./config.js');
  let connection = mysql.createConnection(config);
 var user =null;

  
  amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });
  });
});

console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
channel.consume(queue, function(msg) {
  console.log(" [x] Received %s",  user = JSON.parse(msg));
}, {
    noAck: true
  });

let sql = "INSERT INTO users(name,email,phone) VALUES(user.name,user.email,user.phone)";

// execute the insert statment
connection.query(sql);

connection.end();