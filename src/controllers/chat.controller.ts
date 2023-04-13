import { json, Request, Response } from "express"
import Chat from "../models/Chat";

export const newChat = async (req: Request,res: Response): Promise<Response> =>{
    const newChat = new Chat(req.body);
    await newChat.save();
    return res.status(201).json(newChat);
}


export const ShowChats = async (req: Request, res: Response): Promise<Response>=>{
    
    const Chats = await Chat.find( { $or:[ {usuario1:req.body.userid}, {usuario2:req.body.userid}]});
    if (Chats.length==0) {
        return res.status(400).json({msg:"El usuario no tiene Chats"})
    }
    console.log(Chats);
    return res.status(201).json(Chats);
  
  }

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