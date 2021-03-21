const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const dotenv = require('dotenv');
var amqp = require('amqplib/callback_api');



const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('My app listening on port 8080!')
})



app.post('/send', (req, res) => {
   
    const user = {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
    };

    if (!user ) {
     res.send({ message: "Please provide message in POST parameter." });
     return;
    }


    amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = JSON.stringify(user);
    var msg = 'hiiii';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);

  });
});
 
});
   









