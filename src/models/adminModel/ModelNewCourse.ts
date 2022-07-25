import { Schema, model, Document } from "mongoose";

interface class_interface {
    Class: number;
    Class_Code: string;
    Admission_Fee: number;
    Monthly_Fee: number;
}

const NewCourceSchema = new Schema<class_interface>({
    Class: {
        type: Number,
        required: true,
    },
    Admission_Fee: {
        type: Number,
        required: true,
    },
    Class_Code: {
        type: String,
        required: true,
    },
    Monthly_Fee: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
    }
);

const ModelNewCource = model<class_interface>(
    "Class_Or_Cources",
    NewCourceSchema
);

export { ModelNewCource };
