import { getChannel } from "../../../shared/rabbitmq/connection.js";

import amrp from "amqplib";

const produceEmail = async (emailPayload) => {
  const channel = getChannel();

  // * put in .env.
  const exchange = "email_exchange";
  const queueName = "send_mail_queue";
  const routingKeyForMailSend = "send_mail_to_users_routing";

  await channel.assertExchange(exchange, "direct");
  await channel.assertQueue(queueName, {
    durable: true,
  });

  await channel.bindQueue(queueName, exchange, routingKeyForMailSend);

  const dataBuffer = Buffer.from(JSON.stringify(emailPayload));

  channel.publish(exchange, routingKeyForMailSend, dataBuffer);

  console.log(`Mail is send to rabbitmq Queue : ${queueName}`);
};

export default produceEmail;

// produceEmail({
//   from: "userEmail@gmail.com",
//   to: "krishna.perpetual@gmail.com",
//   message: "order is placed",
//   orderId: "34567dfghjklrtgyui456789tyui",
// });
