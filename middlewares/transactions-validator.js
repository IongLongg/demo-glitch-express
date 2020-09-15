var db = require('../lowdb')

module.exports.isComplete = (req, res, next) => {
    var errors = []
    var transactions = db.get('transactions').value()
    if(!transactions.find(tran => tran.id === req.params.id))
        errors.push('Id is not exist')

    if(errors.length){
        res.render('transactions/index', {
            errors : errors,
            transactions : transactions
        })
        return
    }   
    
    next()
}