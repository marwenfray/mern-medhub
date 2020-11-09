const {body, validationResult}= require ('express-validator')


const signupRules=()=>[
    body("username","username is required").notEmpty(),
    body("email","email is required").isEmail(),
    body("password","the password must contain at least 6 characters").isLength({min:6}),
    body("phoneNumber","phone number is required").isLength({min:8,max:8}),
    body("firstName","firstName is required").notEmpty(),
    body("lastName","lastName is required").notEmpty()
];


const signinRules=()=>[
    body("email","invalid email").isEmail(),
    body("password","invalid password").isLength({min:6}),

];


const validator = (req,res,next)=>{
    const errors= validationResult(req);
    !errors.isEmpty()? res.status(400).send({errors:errors.array()}):
    next();
}

module.exports={signupRules, signinRules,validator}