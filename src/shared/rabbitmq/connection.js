import amrp from "amqplib";
import AppError from "../../../utils/AppError.js";

let connection = null;
let channel = null;

export const connectToRabbitMQ = async () => {
  try {
    const URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";
    // await connectToRabbitMQ();
    connection = await amrp.connect(URL);
    channel = await connection.createChannel();

    console.log(
      `RabbitMQ is ready to use connection: ${connection} : channel: ${channel}`,
    );

    return { connection, channel };
  } catch (error) {
    console.error(`RabbitMQ Error : `, error.message);
  }
};

export const getChannel = () => {
  if (channel !== null && channel !== undefined) {
    return channel;
  }
  throw new AppError("RabbitMq channel not intialiaze", 500);
};

export const closeRabbitMQ = async () => {
  if (channel) await channel.close();
  if (connection) await connection.close();

  console.log(`RabbitMQ connection closed`);
};
