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
exports.ShowChats = exports.newChat = void 0;
const Chat_1 = __importDefault(require("../models/Chat"));
const newChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newChat = new Chat_1.default(req.body);
    yield newChat.save();
    return res.status(201).json(newChat);
});
exports.newChat = newChat;
const ShowChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Chats = yield Chat_1.default.find({ $or: [{ usuario1: req.body.userid }, { usuario2: req.body.userid }] });
    if (Chats.length == 0) {
        return res.status(400).json({ msg: "El usuario no tiene Chats" });
    }
    console.log(Chats);
    return res.status(201).json(Chats);
});
exports.ShowChats = ShowChats;
// export const showAllMessage = async (req:Request,res:Response): Promise<Response> =>{
//   const Messages = await Message.find().sort({fecha:'desc'});
//   return res.status(200).json(Messages)
// }
// export const searchMessages = async (req: Request, res: Response): Promise<Response>=>{
//     const Messages = await Message.find( { $or:[ {de:req.body.userid1, para:req.body.userid2}, {de:req.body.userid2, para:req.body.userid1}]});
//     if (!Messages) {
//         return res.status(400).json({msg:"El Messages que busco no existe"})
//     }
//     console.log(Messages);
//     return res.status(201).json({Messages});
//   }
