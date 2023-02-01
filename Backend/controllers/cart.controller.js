

module.exports.testApi = (req, res, next) => {
    res.send({status: "good"}).end()
}




// module.exports.addproduct = (req,res) =>{
//     const newcart = req.body
//     Product.create(newcart)
//     .then(Product => res.json(cart))
//     .catch(err => res.json(err))
// }