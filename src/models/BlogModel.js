import mongoose from 'mongoose'; 
const DetailsSchema = new mongoose.Schema({
  title:{type:String,required:true,},
  post:{type:String ,required:true},
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },

},
  
  {
    timestamps:true, versionKey:false
  }
);



const BlogModel= mongoose.model("blogs",DetailsSchema);
export default BlogModel;


