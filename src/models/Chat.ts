import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface Chat extends Document {
    usuario1:string,
    usuario2:string,
}


//EL ESQUEMA DE USUARIO
const ChatSchema = new Schema ({
    usuario1:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    usuario2:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
});

ChatSchema.index({'$**': 'text'});

ChatSchema.pre<Chat>('save', async function(next){
    next();

})

export default model<Chat>('Chat', ChatSchema);