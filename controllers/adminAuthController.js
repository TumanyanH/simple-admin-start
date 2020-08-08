const { validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')
const Admin = require('../models/Admin')

module.exports.showLogin = (req, res, next) => {
    return res.render('admin/auth/login', {
        title : "Login",
        path : "/login"
    })
}

module.exports.dashboard = (req, res, next) => {
    return res.render('admin/dashboard/show', {
        title : "Dashboard",
        path : "/"
    })
}

module.exports.login = async (req, res, next) => {
    const login = req.body.login
    const password = req.body.password

    const errors = validationResult(req)

    try {
        if(errors.isEmpty()) {
            const admin = await Admin.findOne({ login : login })
            if(admin) {
                const passwordMatch = await bcrypt.compare(password, admin.password)
                if(passwordMatch) {
                    req.session.isAdmin = true
                    req.session.admin = admin.login
                    console.log('on func', req.session)
                    return res.redirect('/admin/')
                } else {
                    let wrongCreds = [
                        {
                            msg : "Wrong login/password"
                        }
                    ]
                    return res.render('admin/auth/login', {
                        title : "Login",
                        path : "/login",
                        errorMessage : wrongCreds
                    })
                }
            }
        } else {
            return res.render('admin/auth/login', {
                title : "Login",
                path : "/login",
                errorMessage : errors.array()
            })
        }
    } catch(err) {
        next(err)
    }
}
