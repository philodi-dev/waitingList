"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
    constructor(userId, reason, customerId) {
        this.userId = userId;
        this.customerId = customerId;
        this.reason = reason;
    }
    createWaiting() {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.$connect();
            const ticketNumber = generateRandom();
            const waitList = yield prisma.waitList.create({
                data: {
                    ticketNumber: ticketNumber,
                    reason: this.reason,
                    userId: this.userId,
                    customerId: this.customerId,
                    waitingStatus: client_1.WaitingStatus.PENDING,
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
            });
            return waitList;
        });
    }
    updateWaiting(ticketNumber, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.$connect();
            const waitList = yield prisma.waitList.update({
                where: {
                    ticketNumber: ticketNumber,
                },
                data: {
                    waitingStatus: status
                }
            });
            return waitList;
        });
    }
}
exports.default = Wait;
