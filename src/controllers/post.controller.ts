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


export const showUserPost = async (req: Request, res: Response): Promise<Response>=>{
    
  const posts = await Post.find({owner:req.body.owner}).sort({fecha:'desc'});
  if (!posts) {
      return res.status(400).json({msg:"el usuario no tiene Posts"})
  }
  console.log(posts);
  return res.status(201).json({posts});

}

export const searchPost = async (req: Request, res: Response): Promise<Response>=>{
    
  const Posts = await Post.find({$text: {$search: req.body.descripcion}});
  if (!Posts) {
      return res.status(400).json({msg:"El Posts que busco no existe"})
  }
  console.log(Posts);
  return res.status(201).json({Posts});

}

export const showSinglePost = async (req: Request, res: Response): Promise<Response>=>{
    
  const post = await Post.findOne({_id:req.body.Postid});
  if (!post) {
      return res.status(400).json({msg:"El Post que busco no existe"})
  }
  console.log(post);
  return res.status(201).json(post);

}

export const ShowFollowingPosts = async (req: Request, res: Response): Promise<Response>=>{

  const busqueda = await Seguir.find({idSeguidor:req.body.userid})

  let result:any = []
  
  for (let i = 0; i < busqueda.length; i++) {
      const Posts = await Post.find({owner:busqueda[i].idSeguido})

    result = result.concat(Posts)
      
  
  }
  let allPosts = result.sort(function(a:any, b:any) {
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
  });
  
  return res.status(200).json(allPosts)
}