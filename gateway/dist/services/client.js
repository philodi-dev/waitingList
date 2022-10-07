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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var Client = /** @class */ (function () {
    function Client(firstName, lastName, middleName, gender, avatar, email, phoneNumber, company, userStatus) {
        if (firstName === void 0) { firstName = ""; }
        if (lastName === void 0) { lastName = ""; }
        if (middleName === void 0) { middleName = ""; }
        if (gender === void 0) { gender = client_1.Gender.M; }
        if (avatar === void 0) { avatar = ""; }
        if (email === void 0) { email = ""; }
        if (phoneNumber === void 0) { phoneNumber = 1111111111; }
        if (company === void 0) { company = ""; }
        if (userStatus === void 0) { userStatus = client_1.UserStatus.ENABLED; }
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
    Object.defineProperty(Client.prototype, "getFirstName", {
        get: function () {
            return this.firstName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "setFirstName", {
        set: function (value) {
            this.firstName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "getLastName", {
        get: function () {
            return this.lastName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "setLastName", {
        set: function (value) {
            this.lastName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "getGender", {
        get: function () {
            return this.gender;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "setGender", {
        set: function (value) {
            this.gender = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "getAvatar", {
        get: function () {
            return this.avatar;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "setAvatar", {
        set: function (value) {
            this.avatar = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "getEmail", {
        get: function () {
            return this.email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "setEmail", {
        set: function (value) {
            this.email = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "getPhoneNumber", {
        get: function () {
            return this.phoneNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "setPhoneNumber", {
        set: function (value) {
            this.phoneNumber = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "getCompany", {
        get: function () {
            return this.company;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "setCompany", {
        set: function (value) {
            this.company = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "getMiddleName", {
        get: function () {
            return this.middleName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "setMiddleName", {
        set: function (value) {
            this.middleName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "getUserStatus", {
        get: function () {
            return this.userStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "setUserStatus", {
        set: function (value) {
            this.userStatus = value;
        },
        enumerable: false,
        configurable: true
    });
    Client.prototype.createCustomer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newCustomer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prisma.customer.create({
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
                            })];
                    case 2:
                        newCustomer = _a.sent();
                        return [2 /*return*/, newCustomer];
                }
            });
        });
    };
    Client.prototype.getAllCustomers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allCustomers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prisma.customer.findMany()];
                    case 2:
                        allCustomers = _a.sent();
                        return [2 /*return*/, allCustomers];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=client.js.map