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
exports.searchMessages = exports.showAllMessage = exports.newMessage = void 0;
const message_1 = __importDefault(require("../models/message"));
const newMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.descripcion) {
        return res.status(400).json({ msg: "El Mesange no puede estar Vacio" });
    }
    const newMessage = new message_1.default(req.body);
    yield newMessage.save();
    return res.status(201).json(newMessage);
});
exports.newMessage = newMessage;
const showAllMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Messages = yield message_1.default.find().sort({ fecha: 'desc' });
    return res.status(200).json(Messages);
});
exports.showAllMessage = showAllMessage;
const searchMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Messages = yield message_1.default.find({ $or: [{ de: req.body.userid2, para: req.body.userid1 }, { de: req.body.userid1, para: req.body.userid2 }] });
    if (!Messages) {
        return res.status(400).json({ msg: "El Messages que busco no existe" });
    }
    console.log(Messages);
    return res.status(201).json(Messages);
});
exports.searchMessages = searchMessages;
