import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface Img extends Document {
    postid:string,
    uri:string,
}
 

//EL ESQUEMA DE USUARIO
const ImgSchema = new Schema ({
    postid:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    uri:{
        type:String,
        unique:false,
        required:true,
        trim:true
    }
});


ImgSchema.pre<Img>('save', async function(next){
    next();

})

export default model<Img>('Img', ImgSchema);