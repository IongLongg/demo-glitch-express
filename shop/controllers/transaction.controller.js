const ShopTransaction = require("../../models/shop.transaction.model")

module.exports.index = async (req, res) => {
    let reqId = req.signedCookies.userId || req.signedCookies.sessionId

    const transactions = await ShopTransaction.find().exec()
    // res.json(transactions)


    res.render('shop/transaction/index', {
        transactions: transactions.filter(tran => tran.user.id === reqId)
    })
}

module.exports.isComplete = async (req, res) => {
    await ShopTransaction.findByIdAndUpdate(req.params.id, {isComplete : true}, {new : true})
    res.redirect('back')
}