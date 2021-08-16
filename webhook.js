require("dotenv").config();
const TOKEN = process.env.LINE_ACCESS_TOKEN;
const https = require("https");
const dateFNS = require("date-fns");
const { chatbot } = require("./chatbot");

async function handleWebHook(req, res) {
  res.send("HTTP POST request sent to the webhook URL!");
  // If the user sends a message to your bot, send a reply message

  const event = req.body.events[0];
  const lineId = req.lineId;

  if (event.type === "message") {
    const messageType = event.message.type;
    const inputText = event.message.text;

    console.log("webhook");
    const messages = await chatbot(lineId, inputText);

    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: messages,
    });

    // Request header
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    };

    // Options to pass into the request
    const webhookOptions = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers: headers,
      body: dataString,
    };

    // Define request
    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    // Handle error
    request.on("error", (err) => {
      console.error(err);
    });

    // Send data
    request.write(dataString);
    request.end();
  }
}

module.exports = { handleWebHook };
