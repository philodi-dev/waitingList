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
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var prisma = new client_1.PrismaClient();
var Customer = /** @class */ (function () {
    function Customer(firstName, lastName, gender, avatar, email, phoneNumber, pin, role, userStatus) {
        if (firstName === void 0) { firstName = ""; }
        if (lastName === void 0) { lastName = ""; }
        if (gender === void 0) { gender = client_1.Gender.M; }
        if (avatar === void 0) { avatar = ""; }
        if (email === void 0) { email = ""; }
        if (phoneNumber === void 0) { phoneNumber = 1111111111; }
        if (pin === void 0) { pin = ""; }
        if (role === void 0) { role = client_1.Role.PRESENTER; }
        if (userStatus === void 0) { userStatus = client_1.UserStatus.PENDING; }
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
    Object.defineProperty(Customer.prototype, "getFirstName", {
        get: function () {
            return this.firstName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "setFirstName", {
        set: function (value) {
            this.firstName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "getLastName", {
        get: function () {
            return this.lastName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "setLastName", {
        set: function (value) {
            this.lastName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "getGender", {
        get: function () {
            return this.gender;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "setGender", {
        set: function (value) {
            this.gender = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "getAvatar", {
        get: function () {
            return this.avatar;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "setAvatar", {
        set: function (value) {
            this.avatar = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "getEmail", {
        get: function () {
            return this.email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "setEmail", {
        set: function (value) {
            this.email = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "getPhoneNumber", {
        get: function () {
            return this.phoneNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "setPhoneNumber", {
        set: function (value) {
            this.phoneNumber = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "getPin", {
        get: function () {
            return this.pin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "setPin", {
        set: function (value) {
            this.pin = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "getRole", {
        get: function () {
            return this.role;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "setRole", {
        set: function (value) {
            this.role = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "getUserStatus", {
        get: function () {
            return this.userStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "setUserStatus", {
        set: function (value) {
            this.userStatus = value;
        },
        enumerable: false,
        configurable: true
    });
    Customer.prototype.createUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hashedPin, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, bcryptjs_1.genSalt)(10)];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, (0, bcryptjs_1.hash)(this.pin.toString(), salt)];
                    case 3:
                        hashedPin = _a.sent();
                        return [4 /*yield*/, prisma.user.create({
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
                            })];
                    case 4:
                        newUser = _a.sent();
                        console.dir(newUser, { depth: null });
                        return [2 /*return*/, newUser];
                }
            });
        });
    };
    Customer.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prisma.user.findMany()];
                    case 2:
                        allUsers = _a.sent();
                        console.log(allUsers);
                        return [2 /*return*/, allUsers];
                }
            });
        });
    };
    Customer.prototype.userLogin = function (username, pin) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordValid, JWT_SECRET, JWT_EXPIRE, newConnection, tokenData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.$connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prisma.user.findFirst({
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
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("No user found for username: ".concat(username));
                        }
                        return [4 /*yield*/, (0, bcryptjs_1.compare)(pin, user.pin.toString())];
                    case 3:
                        passwordValid = _a.sent();
                        if (!passwordValid) {
                            throw new Error('Invalid password');
                        }
                        JWT_SECRET = '1dcf413b0404be7c6df09d1135a819d0bf618d185ec603b39356e5c233bbad6e746477';
                        JWT_EXPIRE = '1y';
                        newConnection = new Date();
                        return [4 /*yield*/, prisma.user.update({
                                where: {
                                    id: user.id,
                                },
                                data: {
                                    lastLogin: newConnection
                                }
                            })];
                    case 4:
                        _a.sent();
                        user.lastLogin = newConnection;
                        tokenData = (0, jsonwebtoken_1.sign)({
                            userId: user.id,
                            userInfo: user,
                            iss: 'sendmorenow.com',
                        }, JWT_SECRET, {
                            expiresIn: JWT_EXPIRE,
                        });
                        return [2 /*return*/, {
                                token: tokenData,
                                userInfo: user,
                            }];
                }
            });
        });
    };
    ;
    return Customer;
}());
exports.default = Customer;
//# sourceMappingURL=customer.js.map