import mongoose from 'mongoose'; 
const UserDetailsSchema = new mongoose.Schema({
  email:{type:String,required:true,unique:true,lowercase:true},
  password:{type:String ,required:true},

},
  
  {
    timestamps:true, versionKey:false
  }
);



const UserModel= mongoose.model("users",UserDetailsSchema);
export default UserModel;


