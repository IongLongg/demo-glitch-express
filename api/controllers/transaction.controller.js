const Transaction = require('../../models/transaction.model')

module.exports.index = async (req, res) => {
    res.json( await Transaction.find().exec())
}

module.exports.getById = (req, res ) => {
    Transaction.findById(req.params.id)
                .then(tran => res.json(tran))
                .catch(err => res.status(404).json({message : 'Not found'}))
}

module.exports.delete = (req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
                .then(msg => res.json({message : 'Deleted !'}))
                .catch(err => res.status(404).json({message : 'Not found'}))
}

module.exports.create = (req, res) => {
    Transaction.create(req.body)
                .then(tran => res.json({message : 'Created !'}))
}