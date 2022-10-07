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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = __importDefault(require("./config"));
const wait_1 = __importDefault(require("./services/wait"));
const consumeMessage = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield amqplib_1.default.connect(config_1.default.url);
    const channel = yield connection.createChannel();
    yield channel.assertExchange(config_1.default.exchangeName, "direct");
    const q = yield channel.assertQueue("statusQueu");
    yield channel.bindQueue(q.queue, config_1.default.exchangeName, status);
    channel.consume(q.queue, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const receiver = JSON.parse(msg === null || msg === void 0 ? void 0 : msg.content);
        if ((receiver === null || receiver === void 0 ? void 0 : receiver.status) === "PENDING") {
            const wait = new wait_1.default(receiver === null || receiver === void 0 ? void 0 : receiver.userId, "SALARY PAYMENT", (_a = receiver === null || receiver === void 0 ? void 0 : receiver.data) === null || _a === void 0 ? void 0 : _a.id);
            const newWaitingList = yield wait.createWaiting();
            channel.ack(msg);
            console.log(newWaitingList);
        }
    }));
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumeMessage("PENDING");
});
main();
