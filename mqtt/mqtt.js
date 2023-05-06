const mqtt = require("mqtt");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./models/db")

const app = express();
const port = 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://pranshul4782:pogar123@cluster1.yfrh43g.mongodb.net/fitness', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const client = mqtt.connect("mqtt://broker.hivemq.com:1883");


client.on('connect', () => {
  console.log('mqtt connected');
  client.subscribe('/fit/steps');
  client.subscribe('/fit/spo');
  client.subscribe('/fit/hb');
});

var steps="";
var spo2="";
var heartbeat="";

client.on('message', (topic, message) => {
  if (topic === '/fit/steps') {
      console.log('Received data:', message.toString());
      steps = message.toString();
  }
  else if (topic === '/fit/spo') {
      console.log('Received data:', message.toString());
      spo2 = message.toString();
  }
  else if (topic === '/fit/hb') {
      console.log('Received data:', message.toString());
      heartbeat = message.toString();
  }

  const data = new db({steps,spo2,heartbeat});
  console.log(data);
  data.save();


});   
  
  app.listen(port);