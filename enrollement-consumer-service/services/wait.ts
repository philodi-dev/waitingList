import { PrismaClient, User, WaitList, WaitingStatus, Customer } from '@prisma/client'

const prisma = new PrismaClient()

const generateRandom = () => {
    const date = new Date();
    const components = [
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ];
  
    const id = components.join('');
    return id;
  };

class Wait {
    private userId: string;
    private reason: string;
    private customerId: string;

    constructor(userId: string, reason: string, customerId: string) {
        this.userId = userId;
        this.customerId = customerId;
        this.reason = reason;
    }

    public async createWaiting(): Promise<WaitList> {
        await prisma.$connect()

        const ticketNumber = generateRandom();
       
        const waitList = await prisma.waitList.create({
            data: {
                ticketNumber: ticketNumber,
                reason: this.reason,
                userId: this.userId,
                customerId: this.customerId,
                waitingStatus: WaitingStatus.PENDING,
                // user: {
                //     create: [
                //       { : 'This is my first post' },
                //       { title: 'Here comes a second post' },
                //     ],
                // },
                // customer: {
                //     create: [
                //       { title: 'This is my first post' },
                //       { title: 'Here comes a second post' },
                //     ],
                // },
            },
        })

        return waitList;

    }

    public async updateWaiting(ticketNumber: string, status: WaitingStatus): Promise<WaitList> {
        await prisma.$connect()

        const waitList = await prisma.waitList.update({
            where: {
                ticketNumber: ticketNumber,
            },
            data: {
                waitingStatus: status
            }
        });

        return waitList;
    }

}

export default Wait;