import { ObjectId } from 'mongodb';
import { UserModel } from "../mongoDBModel/User";

export async function getUserByEmailService(email:string){
    return await UserModel.findOne({ email: email });
    
  }

  export async function  getUserByIdService(user_id:string){
    return await UserModel.findById({_id:user_id}).exec();
  }


  // export async function uploadProfileImageService(_id:ObjectId,profileImage:Buffer) {
  //   return await UserModel.updateOne({_id,profileImage});
  // }