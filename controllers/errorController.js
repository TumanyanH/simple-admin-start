module.exports.get404 = (res) => {
    return res.render('error/404', {
        title : "404 Not found",
        path : "/404"
    })
}

module.exports.get500 = (res) => {
    return res.render('error/500', {
        title : "Internal error",
        path : "/500"
    })
}