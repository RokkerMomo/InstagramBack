import { json, Request, Response } from "express"
import Img from "../models/img";
import Post from "../models/post";

export const NewImg = async (req: Request,res: Response): Promise<Response> =>{
    const post = await Post.findOne({_id:req.body.postid});
    if(!post){
        return res.status(400).json({msg:'no existe ese post'})
    }
    //GUARDAR Post
    const NewImg = new Img(req.body); 
    await NewImg.save();
    return res.status(201).json(NewImg);
}  
    
export const showPostImgs =async (req:Request,res:Response): Promise<Response> => {
    const Imgs = await Img.find({postid:req.body.postid})
    if (!Imgs) {
        return res.status(400).json({msg:'el post no tiene imagenes o no existe'})

    }
    return res.status(200).json(Imgs)
}