import amqp from "amqplib";

import { Message } from "./types";

const expectedText = "Expected Message by Consumer";

const connectAndRecieveSample = async function () {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      if (message) {
        const content: Message = JSON.parse(message.content.toString());
        console.info(`Recieved message with content ${content.text}`);
        // acknowledge message for this channel
        if (content.text == expectedText) channel.ack(message);
      }
    });
    console.info("Waiting for messages...");
  } catch (err) {
    console.error(err);
  }
};

connectAndRecieveSample();
