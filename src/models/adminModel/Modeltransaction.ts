import { Schema, model, Document, ObjectId } from "mongoose"

export interface transaction_interface {
    transactionId: string,
    classId: ObjectId,
    studentId: ObjectId,
    fee_type: number,
    fee_amount: number,

}

const NewTransactionSchema = new Schema({
    fee_type: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    fee_amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String
    },
    classId: {
        type: Schema.Types.ObjectId, ref: "Class_Or_Cources"
    },
    studentId: {
        type: Schema.Types.ObjectId, ref: "New_User"
    }

},
    {
        timestamps: true
    }
);

const ModelTransaction = model<transaction_interface>("Transaction_history", NewTransactionSchema);

export { ModelTransaction };