import { json, Request, Response } from "express"
import Message from "../models/message";

export const newMessage = async (req: Request,res: Response): Promise<Response> =>{
    if (!req.body.descripcion) {
        return res.status(400).json({ msg: "El Mesange no puede estar Vacio" });
      }
    const newMessage = new Message(req.body);
    await newMessage.save();
    return res.status(201).json(newMessage);
}

export const showAllMessage = async (req:Request,res:Response): Promise<Response> =>{
  const Messages = await Message.find().sort({fecha:'desc'});
  return res.status(200).json(Messages)
}
  
export const searchMessages = async (req: Request, res: Response): Promise<Response>=>{
    
    const Messages = await Message.find( { $or:[{de:req.body.userid2, para:req.body.userid1},{de:req.body.userid1, para:req.body.userid2}]});
    if (!Messages) {
        return res.status(400).json({msg:"El Messages que busco no existe"})
    }
    console.log(Messages);
    return res.status(201).json(Messages);
  
  }