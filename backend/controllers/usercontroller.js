import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'


// @desc... Auth user & get token
// @route ... POST / api/users/login 
// @access...public 

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),

        })

    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc... register a new user 
// @route ... POST / api/users
// @access...public 

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userEXists = await User.findOne({ email })
    if (userEXists) {
        res.status(400)
        throw new Error('utilisateur existe déjà')
    }
    const user = await User.create({
        name,
        email,
        password

    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),

        })

    } else {
        res.status(400)
        throw new Error('Données utilisateur invalides')

    }
})
// @desc... get user profile
// @route ... get / api/users/profile
// @access...private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })


    }
    else {
        res.status(404)
        throw new Error('Utilisateur non trouvé')

    }

})

// @desc... Update user profile
// @route ... PUT / api/users/profile
// @access...private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = User.findById(req.user._id)
    if (user) {
        let password;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(req.body.password, salt)
        }


        const updateUser = await user.update({
            name: req.body.name || user.name,
            email: req.body.email || user.email,
            ...(password && { password })
        })
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id),

        })

    }
    else {
        res.status(404)
        throw new Error('Utilisateur non trouvé')

    }

})

// @desc... get all users
// @route ... get / api/users
// @access...private/Admin

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)



})

// @desc... Delete users
// @route ... DELETE / api/users/:id
// @access...private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    const user = User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: 'Utilisateur supprimé' })

    } else {
        res.status(404)
        throw new Error('Utilisateur non trouvé')
    }



})

// @desc... get users by ID
// @route ... get / api/users/:id
// @access...private/Admin

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('Utilisateur non trouvé')
    }


})

// @desc... Update user 
// @route ... PUT / api/users/:id
// @access...private/Admin

const updateUser = asyncHandler(async (req, res) => {
    const user = User.findById(req.params.id)

    if (user) {
        const updateUser = await user.update({
            name: req.body.name || user.name,
            email: req.body.email || user.email,
            isAdmin: req.body.isAdmin || user.isAdmin
        })
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin

        })

    }
    else {
        res.status(404)
        throw new Error('Utilisateur non trouvé')

    }

})



export {
    authUser, registerUser, getUserProfile,
    updateUserProfile, getUsers, deleteUser, getUserById, updateUser
}