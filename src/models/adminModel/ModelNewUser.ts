import { Schema, model, Document } from "mongoose"

export interface userInterface {
    role: number
    fname: string,
    lname: string,
    email: string,
    mobileNum: string,
    password: string,
    username: string,
    gender: string,
    father_name: string,
    mother_name: string,
    religion: string

}

const NewUserSchema = new Schema<userInterface>({
    role: {
        type: Number,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobileNum: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    father_name: {
        type: String
    },
    mother_name: {
        type: String
    },
  

},
    {
        timestamps: true
    });

const ModelNewUser = model<userInterface>('New_User', NewUserSchema)

export { ModelNewUser }


