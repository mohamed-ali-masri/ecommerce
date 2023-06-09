import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    console.log('test', req.headers.authorization);
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = (await User.findById(decoded.id))
            next()

        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error(' =non autorisé, le jeton a échoué')

        }
    } else {
        res.status(401)
        throw new Error('non autorisé, le jeton a échoué')
    }
})

const admin = (req, res, next) => {
    console.log('req.user ==================>', req.user);
    console.log('req.user.isAdmin ==================>', req.user.isAdmin);
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error(' Non autorisé en tant que administrateur')
    }
}

export { protect, admin }