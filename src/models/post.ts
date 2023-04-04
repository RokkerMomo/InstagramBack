import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface Post extends Document {
    ownername:string,
    owneruser:string,
    owner:string,
    descripcion:string,
    fotoperfil:string,
    fecha:Date,
}


//EL ESQUEMA DE USUARIO
const PostSchema = new Schema ({
    ownername:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    owneruser:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    owner:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    descripcion:{
        type:String,
        unique:false,
        required:false,
        trim:true
    },
    fotoperfil:{
        type:String,
        unique:false,
        required:false,
        trim:true
    },
    fecha:Date
});

PostSchema.index({'$**': 'text'});

PostSchema.pre<Post>('save', async function(next){
    next();

})

export default model<Post>('Post', PostSchema);