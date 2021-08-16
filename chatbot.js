const axios = require("axios");

const rasaURL = "http://localhost:5005/webhooks/rest/webhook";

function addTextMessageToReply(messageArray, text) {
  messageArray.push({
    type: "text",
    text: text,
  });
}

function addImageToReply(messageArray, url) {
  messageArray.push({
    type: "image",
    originalContentUrl: url,
    previewImageUrl: url,
  });
}

async function chatbot(lineId, inputText) {
  const messages = [];

  const response = await axios.post(rasaURL, {
    sender: lineId,
    message: inputText,
  });

  //console.log(response.data);

  response.data.forEach((el) => {
    "text" in el && addTextMessageToReply(messages, el.text);
    "image" in el && addImageToReply(messages, el.image);
  });

  console.log(inputText);
  console.log(messages);

  return messages;
}

//chatbot();

module.exports = { chatbot };
