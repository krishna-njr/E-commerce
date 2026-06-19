import AppError from "../../../../utils/AppError.js";
import { getChannel } from "../../../shared/rabbitmq/connection.js";

import amrp from "amqplib";

const consumeEmail = async (payload) => {
  const channel = getChannel();

  // * put in .env.
  //   const URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";
  //   const connection = await amrp.connect(URL);
  //   const channel = await connection.createChannel();
  const exchange = "email_exchange";
  const queueName = "send_mail_queue";
  const routingKeyForMailSend = "send_mail_to_users_routing";

  //   await channel.assertQueue(queueName, { durable: false });
  await channel.assertQueue(queueName, {
    durable: true,
  });

  channel.consume(queueName, async (message) => {
    if (!message) {
      console.log("Queue is Empty", queueName);
      return new AppError("Internal server error");
    }
    // console.log(message); buffer data :
    try {
      const data = JSON.parse(message.content.toString());
      console.log(`Node mailer part`, data);
      channel.ack(message); // *********************
    } catch (error) {
      if (error instanceof AppError) return error;
      console.log(`Consumer error on queue : `, queueName);
      return new AppError("Internal Server Error");
      channel.nack(message, false, false); // ****************
    }
  });
};

consumeEmail();
