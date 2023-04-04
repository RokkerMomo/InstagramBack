import { json, Request, Response } from "express"
import Post from "../models/post";
import Seguir from "../models/Seguimiento";

//Crear Post
export const newPost = async (req: Request,res: Response): Promise<Response> =>{
    if (!req.body.descripcion&&req.body.foto=='undefined') {
        return res.status(400).json({ msg: "El Post no puede estar Vacio" });
      }
    //GUARDAR Post
    const newPost = new Post(req.body);
    await newPost.save();
    return res.status(201).json(newPost);
}

export const showAllPosts = async (req:Request,res:Response): Promise<Response> =>{
  const posts = await Post.find().sort({fecha:'desc'});
  return res.status(200).json(posts)
}
