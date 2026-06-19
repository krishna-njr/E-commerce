import { getChannel } from "../../../shared/rabbitmq/connection.js";

import amrp from "amqplib";

const publishMessage = async (payload) => {
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

  const dataBuffer = Buffer.from(JSON.stringify(payload));

  channel.publish(exchange, routingKeyForMailSend, dataBuffer);

  console.log(`Mail is send to user with this payload : `, payload);
};

export default publishMessage;

// publishMessage({
//   from: "userEmail@gmail.com",
//   to: "krishna.perpetual@gmail.com",
//   message: "order is placed",
//   orderId: "34567dfghjklrtgyui456789tyui",
// });
