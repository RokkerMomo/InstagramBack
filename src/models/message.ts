import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface Message extends Document {
    descripcion:string,
    de:string,
    para:string,
    fecha:Date,
}


//EL ESQUEMA DE USUARIO
const MessageSchema = new Schema ({
    descripcion:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    de:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    para:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    fecha:Date
});

MessageSchema.index({'$**': 'text'});

MessageSchema.pre<Message>('save', async function(next){
    next();

})

export default model<Message>('Message', MessageSchema);