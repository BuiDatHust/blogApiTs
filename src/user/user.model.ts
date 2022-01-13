import * as mongoose from 'mongoose'
import User from './user.interface';

const addressSchema  = new mongoose.Schema({
    city: String,
    country: String,
    street: String
})

const userSchema = new mongoose.Schema({
    
        address: addressSchema,
        email: String ,
        firstname: String,
        lastname: String ,
        password: String,

},
{
    toJSON:{
        virtuals: true ,
        getters: true 
    }
})

userSchema.virtual('fullname').get(function(){
    return `${this.firstname} ${this.lastname}`;
})

userSchema.virtual('posts',{
    ref:"Post",
    localField: '_id',
    foreignField: 'author'
})

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;

