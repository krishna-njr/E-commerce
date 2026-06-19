import amqp from "amqplib";
import { getChannel } from "../../../shared/rabbitmq/connection.js";
import sendEmail from "../../../../utils/nodemailer.js";
const queueName = "send_mail_queue";

const consumeEmail = async () => {
  try {
    const channel = await getChannel();

    await channel.assertQueue(queueName, { durable: true });

    await channel.prefetch(1);

    console.log(`Listening for messages on queue: ${queueName}`);

    channel.consume(queueName, async (message) => {
      if (!message) {
        console.warn(`[Worker] Received empty message on queue: ${queueName}`);
        return;
      }

      try {
        const data = JSON.parse(message.content.toString());

        await sendEmail(data);

        channel.ack(message);
      } catch (error) {
        console.error(`Failed to process message:`, error.message);

        channel.nack(message, false, true);
      }
    });
  } catch (error) {
    console.error(`error on queue ${queueName}:`, error.message);
    setTimeout(consumeEmail, 5000);
  }
};

// consumeEmail();

export default consumeEmail;
