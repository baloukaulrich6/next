import Jwt  from "jsonwebtoken";

export const createActivationToken = (payload)=>{
    return Jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: "1d",
    })
}