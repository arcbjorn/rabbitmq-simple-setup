import amqp from "amqplib";

import { Message } from "./types";

const expectedText = "Expected Message by Consumer";
const unexpectedText = "Message that is not expected by Consumer";

const expectedMessage: Message = {
  text: expectedText,
};

const unexpectedMessage: Message = {
  text: unexpectedText,
};

const connectAndSendSample = async function () {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");

    // send expected mesage
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(expectedMessage)));
    console.info(`Message sent succefully: ${expectedMessage.text}`);
    // send unexpected mesage
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(unexpectedMessage)));
    console.info(`Message sent succefully: ${unexpectedMessage.text}`);
  } catch (err) {
    console.error(err);
  }
};

connectAndSendSample();
