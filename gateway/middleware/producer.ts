import ampq from 'amqplib';
import rabbitMQ from '../config';

class Producer {
    private channel: any;

    private async createChannel() {
        const connection = await ampq.connect(rabbitMQ.url);
        this.channel = await connection.createChannel();
    }

    public async publishMessage(waitingStatus: string, message: string, data: any, userId: string){
        if(!this.channel) {
            await this.createChannel();
        }
        await this.channel.assertExchange(rabbitMQ.exchangeName, "direct");
        await this.channel.publish(
            rabbitMQ.exchangeName, 
            waitingStatus, 
            Buffer.from(
                JSON.stringify({
                    status: waitingStatus,
                    message: message,
                    userId: userId,
                    data: data,
                    dateTime: new Date(),
                })
            )
        );

        console.log(`${message}`);
        console.log(`${JSON.stringify(data)}`);
    }
}

export default Producer;
