import joi from 'joi'
// import joi.objectId from 
// joi['objectId'] = require('joi-objectid')(joi)




 class adminvalidations {
 newUserSchema = joi.object({
     role : joi.number().valid(1,2,3).required(),
    fname : joi.string().min(3).required(),
    lname : joi.string().min(3).required(),
    email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    mobileNum : joi.number().min(1000000000).max(9999999999).required(),
    password : joi.string().min(3).max(15).required(),
    father_name : joi.string(),
    mother_name : joi.string(),
    parentnumber : joi.number().min(1000000000).max(9999999999)
})
  


 newCourseSchema = joi.object({
    class: joi.number().required(),
    Admission_Fee: joi.number().required(),
    class_code : joi.string().required(),
    Monthly_Fee : joi.number().required()
})



 newStudentSchema = joi.object({
    userId : joi.string().hex().length(24).required(),
    classId  : joi.string().hex().length(24).required().error( ()=>Error("Class Id is not valid")),
})



 transactionSchema = joi.object({
    fee_type : joi.number().valid(1,2,3).required(),
    fee_amount : joi.number().required(),
    classId : joi.string().hex().length(24),
    studentId : joi.string().hex().length(24)
})
}

export const validations = new adminvalidations()

// module.exports = { newUserSchema:newUserSchema,
// newCourseSchema:newCourseSchema,
// newStudentSchema,
// transactionSchema:transactionSchema}

