import joi from 'joi'
// import joi.objectId from 
// joi['objectId'] = require('joi-objectid')(joi)




 class adminvalidations {
 newUserSchema = joi.object({
     role : joi.number().valid(1,2,3).required().error( ()=>Error("Role is not valid")),
    fname : joi.string().min(3).required().error( ()=>Error("FirstName is not valid")),
    lname : joi.string().min(3).required().error( ()=>Error("LastName is not valid")),
    email : joi.string().email().required().error( ()=>Error("Email is not valid")),
    mobileNum : joi.string().length(10).required().error( ()=>Error("Mobile Number is not valid")),
    password : joi.string().min(3).max(15).required().error( ()=>Error("Password is not valid")),
    father_name : joi.string().error( ()=>Error("Father Name is not valid")),
    mother_name : joi.string().error( ()=>Error("Mother Name is not valid")),
    parentnumber : joi.string().error( ()=>Error("Parent Number is not valid"))
})
  


 newCourseSchema = joi.object({
    class: joi.number().required().error( ()=>Error("Class is not valid")),
    Admission_Fee: joi.number().required().error( ()=>Error("Addmission Fee is not valid")),
    class_code : joi.string().required().error( ()=>Error("Class Code is not valid")),
    Monthly_Fee : joi.string().required().error( ()=>Error("Monthly Fee is not valid"))
})



 newStudentSchema = joi.object({
    userId : joi.string().hex().length(24).required().error( ()=>Error("Uer Id is not valid")),
    classId  : joi.string().hex().length(24).required().error( ()=>Error("Class Id is not valid")),
})



 transactionSchema = joi.object({
    fee_type : joi.number().valid(1,2,3).required().error( ()=>Error("Fee Type is not valid")),
    fee_amount : joi.number().required().error( ()=>Error("Fee Amount is not valid")),
    classId : joi.string().hex().length(24).error( ()=>Error("Class Id is not valid")),
    studentId : joi.string().hex().length(24).error( ()=>Error("Student Id is not valid"))
})
}

export const validations = new adminvalidations()

// module.exports = { newUserSchema:newUserSchema,
// newCourseSchema:newCourseSchema,
// newStudentSchema,
// transactionSchema:transactionSchema}

