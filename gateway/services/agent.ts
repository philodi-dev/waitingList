import { PrismaClient, UserStatus, Gender, Role, User } from '@prisma/client'
import { compare, hash, genSalt } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { UserLogin } from '../utils/types';

const prisma = new PrismaClient()

class Agent {
    private firstName: string;
    private lastName: string;
    private gender: Gender;
    private avatar: string;
    private email: string;
    private phoneNumber: number;
    private pin: string;
    private role: Role;
    private userStatus: UserStatus;

    constructor(firstName: string = "", lastName: string = "", gender: Gender = Gender.M, avatar: string = "", email: string = "", phoneNumber: number = 1111111111, pin: string = "", role: Role = Role.PRESENTER, userStatus: UserStatus = UserStatus.PENDING) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.avatar = avatar;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.pin = pin;
        this.role = role;
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

    get getPin() { 
        return this.pin;
    }

    set setPin(value: string) { 
        this.pin = value;
    }

    get getRole() { 
        return this.role;
    }

    set setRole(value: Role) { 
        this.role = value;
    }

    get getUserStatus() { 
        return this.userStatus;
    }

    set setUserStatus(value: UserStatus) { 
        this.userStatus = value;
    }

    public async createUser(): Promise<User> {
        await prisma.$connect()
        const salt = await genSalt(10);
        const hashedPin = await hash(this.pin.toString(), salt);

        const newUser = await prisma.user.create({
            data: {
                firstName: this.firstName,
                lastName: this.lastName,
                gender: this.gender,
                avatar: this.avatar,
                email: this.email,
                phoneNumber: this.phoneNumber,
                pin: hashedPin,
                role: this.role,
                userStatus: this.userStatus
            },
        })

        return newUser;

    }

    public async getAllUsers(): Promise<User[]> {
        await prisma.$connect()
        const allUsers = await prisma.user.findMany()

        return allUsers;
    }

    public async userLogin(username: string, pin: string): Promise<UserLogin | null> {
        
        await prisma.$connect()
        const user = await prisma.user.findFirst({
            where: {
                //userStatus: UserStatus.ENABLED,
                OR: [
                    {
                        email: username,
                    },
                    {
                        firstName: username,
                    },
                ],
            },
        });

        if (!user) {
            throw new Error(`No user found for username: ${username}`);
        }

        const passwordValid = await compare(pin, user.pin.toString());
        if (!passwordValid) {
            throw new Error('Invalid password');
        }

        const JWT_SECRET =
            '1dcf413b0404be7c6df09d1135a819d0bf618d185ec603b39356e5c233bbad6e746477';
        const JWT_EXPIRE = '1y';

        const newConnection = new Date();

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                lastLogin: newConnection
            }
        });

        user.lastLogin = newConnection;

        const tokenData = sign(
            {
                userId: user.id,
                userInfo: user,
                iss: 'sendmorenow.com',
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRE,
            }
        );
        return {
            token: tokenData,
            userInfo: user,
        };
    };
}

export default Agent;