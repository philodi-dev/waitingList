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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var producer_1 = __importDefault(require("./middleware/producer"));
var agent_1 = __importDefault(require("./services/agent"));
var client_1 = __importDefault(require("./services/client"));
var wait_1 = __importDefault(require("./services/wait"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
var producer = new producer_1.default();
app.use(body_parser_1.default.json());
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, allCustomers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = new wait_1.default();
                return [4 /*yield*/, customer.getWaitingList(["PENDING", "IN_PROGRESS", "COMPLETED", "DELAYED"])];
            case 1:
                allCustomers = _a.sent();
                res.json(allCustomers);
                return [2 /*return*/];
        }
    });
}); });
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, allUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = new agent_1.default();
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.getAllUsers())];
            case 1:
                allUsers = _a.sent();
                res.json(allUsers);
                return [2 /*return*/];
        }
    });
}); });
/*
  1. Only authorized people to access the route
  2. Check wheter there any request body being sent
  3. Data validation and manipulation
  4. Save the customer details on the database and get a ticket number
  5. Store the ticket number in a message queu as pending for completion
  * 6. Trigger the notification service to send sms to customer regarding their payment time

  Note: The sms-c service will consume the message queeu being producing here and be able to send the sms to the employee
  with their ticket number information, time to be paied and some additional informations
*/
app.post('/enroll', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, middleName, gender, avatar, email, phoneNumber, company, userStatus, userId, customer, newCustomer, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, middleName = _a.middleName, gender = _a.gender, avatar = _a.avatar, email = _a.email, phoneNumber = _a.phoneNumber, company = _a.company, userStatus = _a.userStatus, userId = _a.userId;
                customer = new client_1.default(firstName, lastName, middleName, gender, avatar, email, phoneNumber, company, userStatus);
                return [4 /*yield*/, customer.createCustomer()];
            case 1:
                newCustomer = _b.sent();
                return [4 /*yield*/, producer.publishMessage("PENDING", "Customer enrolled successfully at ".concat(new Date()), newCustomer, userId)];
            case 2:
                _b.sent();
                res.json({
                    status: 201,
                    data: newCustomer,
                    message: "Customer enrolled successfully at ".concat(new Date())
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.json({
                    status: 501,
                    data: [],
                    message: "".concat(error_1.message)
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/register', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, gender, avatar, email, phoneNumber, pin, role, userStatus, agent, newAgent, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, gender = _a.gender, avatar = _a.avatar, email = _a.email, phoneNumber = _a.phoneNumber, pin = _a.pin, role = _a.role, userStatus = _a.userStatus;
                agent = new agent_1.default(firstName, lastName, gender, avatar, email, phoneNumber, pin, role, userStatus);
                return [4 /*yield*/, agent.createUser()];
            case 1:
                newAgent = _b.sent();
                res.json({
                    status: 201,
                    data: newAgent,
                    message: "Agent created successfully at ".concat(new Date())
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.json({
                    status: 501,
                    data: [],
                    message: "".concat(error_2.message)
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, pin, agent, newAgent, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, pin = _a.pin;
                agent = new agent_1.default();
                return [4 /*yield*/, agent.userLogin(username, pin)];
            case 1:
                newAgent = _b.sent();
                res.json({
                    status: 201,
                    data: newAgent,
                    message: "Agent created successfully at ".concat(new Date())
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                res.json({
                    status: 501,
                    data: [],
                    message: "".concat(error_3.message)
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/*
  1. Only authorized people to access the route
  2. Get the next available ticket number to process
  3. Data validation and manipulation
  4. Update the ticket number as completed
  5. Store the ticket number in a message queu as pending for completion
  * 6. Trigger the notification service to send sms to employee regarding their payment time

  Note: The sms-c service will consume the message queeu being producing here and be able to send the sms to the employee
  with their ticket number information, time to be paied and some additional informations
*/
app.post('/complete', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, routingKey, message;
    return __generator(this, function (_b) {
        _a = req.body, routingKey = _a.routingKey, message = _a.message;
        // await producer.publishMessage(routingKey, message)
        res.send("successfully completed the subscription at ".concat(new Date()));
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map