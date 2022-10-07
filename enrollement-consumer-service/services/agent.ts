import { PrismaClient, User, WaitList } from '@prisma/client'

const prisma = new PrismaClient()

class Agent {
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    public async getCurrentAgent(): Promise<User | null> {
        await prisma.$connect()
        const user = await prisma.user.findFirst({
            where: {
                id: this.userId,
            },
        });

        return user;
    }

    public async updateCurrentAgent(waitLists: any): Promise<User> {
        await prisma.$connect()

        const user = await prisma.user.update({
            where: {
                id: this.userId,
            },
            data: {
                waitLists: waitLists
            }
        });

        return user;
    }

}

export default Agent;