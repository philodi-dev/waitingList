import { PrismaClient, UserStatus, Gender, Customer } from '@prisma/client'

const prisma = new PrismaClient()

class Client {
    private firstName: string;
    private lastName: string;
    private middleName: string;
    private gender: Gender;
    private avatar: string;
    private email: string;
    private phoneNumber: number;
    private company: string;
    private userStatus: UserStatus;

    constructor(firstName: string = "", lastName: string = "", middleName: string = "", gender: Gender = Gender.M, avatar: string = "", email: string = "", phoneNumber: number = 1111111111,company: string = "" , userStatus: UserStatus = UserStatus.ENABLED) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.gender = gender;
        this.avatar = avatar;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.company = company;
        this.userStatus = userStatus;
    }

    get getFirstName() { 
        return this.firstName;
    }

    set setFirstName(value: string) { 
        this.firstName = value;
    }

    get getLastName() { 
        return this.lastName;
    }

    set setLastName(value: string) { 
        this.lastName = value;
    }

    get getGender() { 
        return this.gender;
    }

    set setGender(value: Gender) { 
        this.gender = value;
    }

    get getAvatar() { 
        return this.avatar;
    }

    set setAvatar(value: string) { 
        this.avatar = value;
    }

    get getEmail() { 
        return this.email;
    }

    set setEmail(value: string) { 
        this.email = value;
    }

    get getPhoneNumber() { 
        return this.phoneNumber;
    }

    set setPhoneNumber(value: number) { 
        this.phoneNumber = value;
    }

    get getCompany() { 
        return this.company;
    }

    set setCompany(value: string) { 
        this.company = value;
    }

    get getMiddleName() { 
        return this.middleName;
    }

    set setMiddleName(value: string) { 
        this.middleName = value;
    }

    get getUserStatus() { 
        return this.userStatus;
    }

    set setUserStatus(value: UserStatus) { 
        this.userStatus = value;
    }

    public async createCustomer(): Promise<Customer> {
        await prisma.$connect()
        
        const newCustomer = await prisma.customer.create({
            data: {
                firstName: this.firstName,
                lastName: this.lastName,
                middleName: this.middleName,
                gender: this.gender,
                avatar: this.avatar,
                email: this.email,
                phoneNumber: this.phoneNumber,
                company: this.company,
                userStatus: this.userStatus
            },
        })

        return newCustomer;

    }

    public async getAllCustomers(): Promise<Customer[]> {
        await prisma.$connect()
        const allCustomers = await prisma.customer.findMany()

        return allCustomers;
    }

    
}

export default Client;