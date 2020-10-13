const bcrypt = require('bcrypt')

const User = require('../../models/user.model')

module.exports.login = async (req, res) => {
    const reqEmail = req.body.email
    // res.locals.email = email
    const errors = []

    const user = await User.findOne({email : reqEmail}).exec()
    if(!user){
        errors.push('User does not exist')
        res.json(errors)
        return
    }
    if(user.wrongLoginCount > 3){
        const msg = {
            to: user.email,
            from: 'longhn.B18AT138@stu.ptit.edu.vn',
            subject: 'Your account was blocked for security',
            html: '<strong>You need to check out your account</strong>',
        }
        
        sgMail.send(msg)
            .then(() => {}, err => {
                console.log(err)
                if(err.response)
                    console.log(err.response.body);
            })

        user.wrongLoginCount = 0
        await user.save()
        res.json(['Wrong too much'])
        return
    } else{
        if(bcrypt.compareSync(req.body.password, user.password) === false){
            errors.push('Wrong password')
            user.wrongLoginCount++
            await user.save()
        }
    }

    if(errors.length){
        res.json(errors)
        return
    }

    res.json({
        message : "Login success",
        data : user
    })
}

module.exports.logout = (req, res) => {
    res.clearCookie('userId')
    res.clearCookie('sessionId')
    res.json({
        message : 'Logout success'
    })
}

module.exports.getById = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json({
            data : {
                name : user.name,
                email : user.email,
                avatar : user.avatar,
            }
        }))
        .catch(err => res.status(404).json({message : 'Not found'}))
}

module.exports.index = async (req, res) => {
    const users = await User.find().exec()
    res.json(users.map(user => {
        return {
            name : user.name,
            email : user.email,
            avatar : user.avatar,
        }
    }))
}