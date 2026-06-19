import { getChannel } from "../../../shared/rabbitmq/connection.js";

import amrp from "amqplib";

const publishMessage = async (payload) => {
  //   const channel = getChannel();

  // * put in .env.
  //   const URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";
  //   const connection = await amrp.connect(URL);
  //   const channel = await connection.createChannel();
  const exchange = "email_exchange";
  const queueName = "send_mail_queue";
  const routingKeyForMailSend = "send_mail_to_users_routing";

  //   let channel = await getChannel();
  //   console.log("channel =", channel);
  //   console.log("type =", typeof channel);
  //   console.log("keys =", Object.keys(channel || {}));
  await channel.assertExchange(exchange, "direct");
  //   await channel.assertQueue(queueName);
  await channel.assertQueue("send_mail_queue", {
    durable: true,
  });

  await channel.bindQueue(queueName, exchange, routingKeyForMailSend);

  channel.publish(
    exchange,
    routingKeyForMailSend,
    Buffer.from(JSON.stringify(payload)),
  );
  console.log(`Mail is send to user`, payload);
};

export default publishMessage;

publishMessage({
  from: "userEmail@gmail.com",
  to: "alin@gmail.com",
  message: "order is placed",
  orderId: "34567dfghjklrtgyui456789tyui",
});
