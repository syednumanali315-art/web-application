// server.js
const express = require('express');
const AWS = require('aws-sdk');
const app = express();
app.use(express.json());
app.use(express.static('.'));

AWS.config.update({ region: 'ap-south-1' });
const sns = new AWS.SNS();

app.post('/alert', async (req, res) => {
  try {
    await sns.publish({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Message: req.body.message,
      Subject: 'EMERGENCY: HealthMonitor Alert'
    }).promise();
    res.json({ ok: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Running on port 3000'));
