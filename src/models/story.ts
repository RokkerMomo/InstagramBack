import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface Story extends Document {
    ownername:string,
    owneruser:string,
    owner:string,
    descripcion:string,
    fotoperfil:string,
    foto:string,
    fecha:Date,
}


//EL ESQUEMA DE USUARIO
const StorySchema = new Schema ({
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
    foto:{
        type:String,
        unique:false,
        required:false,
        trim:true
    },
    fecha:Date
});

StorySchema.index({'$**': 'text'});

StorySchema.pre<Story>('save', async function(next){
    next();

})

export default model<Story>('Story', StorySchema);