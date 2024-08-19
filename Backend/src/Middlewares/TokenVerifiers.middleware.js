import BlackListedTokens from '../models/blacklistedTokesModel.js';
import { verifyToken } from "../Helpers/jwt.auth.helper.js"

const verifyAccessToken=(req,res,next)=>{
    const token=req.token
    const payload=verifyToken(token,"ACCESS")
    if(payload.status!==200){
        res.status(404).send({
            message:payload.message
        })
    }else{
        const {username} = payload.decoded
        req.username=username
        console.log(username)
        next()
    }
}

const verifyRefreshToken=async (req,res,next)=>{
    const token=req.token
    const tokenRecord = await BlackListedTokens.findOne({ token });
    const isTokenBlacklisted = tokenRecord !== null;

    if(!isTokenBlacklisted){
        const payload=verifyToken(token,"REFRESH")

        if(payload.status!==200){
            res.status(404).send({
                message:payload.message
            })
        }else{
            const {username} = payload.decoded
            req.username=username
            next()
        }
    }else{
        res.status(404).send({
            message:`TOKEN EXPIRED`
        })
    }
}

export {
    verifyAccessToken,
    verifyRefreshToken
}