import { Model, Schema, Document, model } from "mongoose";
import bcrypt from 'bcrypt'

//INTERFACE
export interface IUser extends Document {
    fullname:string,
    usuario:string,
    password:string,
    bio:string,
    foto:string,
    comparePassword:(p: object) => Response

      
}

//EL ESQUEMA DE USUARIO
const UserSchema = new Schema ({
    fullname:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    usuario:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    bio:{
        type:String,
        required:false
    },
    foto:{
        type:String,
        required:false
    }
});




UserSchema.pre<IUser>('save', async function(next){
    const user = this;
    if (!user.isModified('password')) return next();
    //ENCRIPTAR CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password,salt);
    user.password = hash;
    next();

})


//COMPARAR CONTRASEÑAS ENCRIPTADAS
UserSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
  };


export default model<IUser>('usuarios', UserSchema);