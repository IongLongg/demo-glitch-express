module.exports = (err, req, res, next) => {
    res.status(500);
    res.send("<h1>Oops, something went wrong.</h1><img src='/images/500-Error-Log-File.png'>")
}