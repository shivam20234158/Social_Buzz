import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    bio: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
    nativeLanguage: {
        type: String,
        default: "",
      },
      learningLanguage: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      isOnboarded: {
        type: Boolean,
        default: false,
      },
      friend:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
},{timestamps: true});

//pre hook
//to protect from the hacker to get data (real password will be converted)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

//required method to match password in login
userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect=await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
  };

const User = mongoose.model('User', userSchema);


export default User;