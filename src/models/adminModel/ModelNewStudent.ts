import { Schema, model, ObjectId, Document } from "mongoose";

export interface student_interface {
    userId: ObjectId,
    classId: ObjectId,
    rollNum: number,
    IsActive: string,
    total_due_fee: number,

}
const NewStudentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: "New_User",
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId, ref: "Class_Or_Cources",
        required: true
    },
    rollNum: {
        type: Number
    },
    IsActive: {
        type: String,
        default: 'true'
    },
    total_due_fee: {
        type: Number,
        default: 0
    },

},
    {
        timestamps: true
    }
);

const ModelNewStudent = model<student_interface>("New_Student", NewStudentSchema);

export { ModelNewStudent };