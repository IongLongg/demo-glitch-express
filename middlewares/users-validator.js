
module.exports.postCreate = (req, res, next) => {
    var errors = []
    if(req.body.name.length > 30)
        errors.push('User name is too long')
    if(req.body.name === '')
        errors.push('Name is required')

    
    if(errors.length){
        res.render('users/create', {
            errors : errors
        })
        return
    }
    next()
}