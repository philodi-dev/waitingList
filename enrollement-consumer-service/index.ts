import ampq from 'amqplib';
import rabbitMQ from './config';
import Agent from './services/agent';
import Wait from './services/wait';

const consumeMessage = async (status: string) => {
    const connection = await ampq.connect(rabbitMQ.url);
    const channel = await connection.createChannel();

    await channel.assertExchange(rabbitMQ.exchangeName, "direct");

    const q = await channel.assertQueue("statusQueu")

    await channel.bindQueue(q.queue, rabbitMQ.exchangeName, status);

    channel.consume(q.queue, async (msg: any) => {
        const receiver = JSON.parse(msg?.content);
        if(receiver?.status === "PENDING") {
            const wait = new Wait(receiver?.userId, "SALARY PAYMENT", receiver?.data?.id,);
            const newWaitingList = await wait.createWaiting();
            channel.ack(msg)
            console.log(newWaitingList);
        }
    })

}

const main = async () => {

    await consumeMessage("PENDING");
}

main()