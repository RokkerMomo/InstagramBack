import { json, Request, Response } from "express"

import Seguir from "../models/Seguimiento";
import Story from "../models/story";

//Crear Story
export const neworUpdateStory = async (req: Request,res: Response): Promise<Response> =>{
    if (!req.body.descripcion&&req.body.foto=='undefined') {
        return res.status(400).json({ msg: "El Story no puede estar Vacio" });
      }
    //GUARDAR Story
    const historia = await Story.find({owner:req.body.owner})

    if (historia.length==0) {
    const newStory = new Story(req.body);
    await newStory.save();
    return res.status(201).json(newStory);
    }
 
    const actualizar = await Story.findOneAndUpdate({owner:req.body.owner},{descripcion:req.body.descripcion, foto:req.body.foto})
    return res.status(201).json(actualizar)
}
 
export const showAllStorys = async (req:Request,res:Response): Promise<Response> =>{
  const Storys = await Story.find().sort({fecha:'desc'});
  return res.status(200).json(Storys)
}


export const showUserStory = async (req: Request, res: Response): Promise<Response>=>{
    
  const Storys = await Story.find({owner:req.body.owner}).sort({fecha:'desc'});
  if (!Storys) {
      return res.status(400).json({msg:"el usuario no tiene Storys"})
  }
  console.log(Storys);
  return res.status(201).json({Storys});

}

export const searchStory = async (req: Request, res: Response): Promise<Response>=>{
    
  const Storys = await Story.find({$text: {$search: req.body.descripcion}});
  if (!Storys) {
      return res.status(400).json({msg:"El Storys que busco no existe"})
  }
  console.log(Storys);
  return res.status(201).json({Storys});

}

export const showSingleStory = async (req: Request, res: Response): Promise<Response>=>{
    
  const historia = await Story.findOne({_id:req.body.Storyid});
  if (!historia) {
      return res.status(400).json({msg:"El Story que busco no existe"})
  }
  console.log(Story);
  return res.status(201).json(historia);

}

export const ShowFollowingStorys = async (req: Request, res: Response): Promise<Response>=>{

  const busqueda = await Seguir.find({idSeguidor:req.body.userid})

  let result:any = []
  
  for (let i = 0; i < busqueda.length; i++) {
      const Storys = await Story.find({owner:busqueda[i].idSeguido})

    result = result.concat(Storys)
      
  
  }
  let allStorys = result.sort(function(a:any, b:any) {
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
  });
  
  return res.status(200).json(allStorys)
}