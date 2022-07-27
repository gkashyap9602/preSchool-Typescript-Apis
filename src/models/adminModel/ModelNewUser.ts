import { string } from "joi";
import { Schema, model, Document } from "mongoose"

export interface userInterface {
    role: number
    fname: string,
    lname: string,
    email: string,
    mobileNum: number,
    password: string,
    username: string,
    father_name: string,
    mother_name: string,
    parent_number : number

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
        type: Number,
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
    parent_number : {
        type : Number
    }

},
    {
        timestamps: true
    });

const ModelNewUser = model<userInterface>('New_User', NewUserSchema)

export { ModelNewUser }


