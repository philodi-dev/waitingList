import { PrismaClient, User, WaitList, Customer } from '@prisma/client'

const prisma = new PrismaClient()

class Client {
    private customerId: string;

    constructor(customerId: string) {
        this.customerId = customerId;
    }

    public async updateCustomer(waitLists: any): Promise<Customer> {
        await prisma.$connect()

        const customer = await prisma.customer.update({
            where: {
                id: this.customerId,
            },
            data: {
                waitLists: waitLists
            }
        });

        return customer;
    }

}

export default Client;