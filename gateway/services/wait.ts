import { PrismaClient, WaitList, WaitingStatus } from '@prisma/client'

const prisma = new PrismaClient()

class Wait {

    public async getWaitingList(status: Array<WaitingStatus>): Promise<WaitList[]> {
        await prisma.$connect()
        const waitLists = await prisma.waitList.findMany({
            where: {
                waitingStatus: { in: status },
            },
            // include: {
            //     user: true,
            //     customer: true,
            // },
          });

        return waitLists;
    }

}

export default Wait;