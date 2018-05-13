// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM ic_managers WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'm_login',
            passwordField : 'm_password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, m_login, m_password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM ic_managers WHERE m_login = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        m_login: m_login,
                        m_password: bcrypt.hashSync(m_password, null, null)  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO ic_managers ( m_login, m_password ) values (?,?)";

                    connection.query(insertQuery,[newUserMysql.m_login, newUserMysql.m_password],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'm_login',
            passwordField : 'm_password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, m_login, m_password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM ic_managers WHERE m_login = ?",[m_login], function(err, rows){
                console.log(rows[0]);
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Пользователь не найден!')); // req.flash is the way to set flashdata using connect-flash
                }


                // if the user is found but the password is wrong
                if (!( rows[0].m_password == m_password))
                    return done(null, false, req.flash('loginMessage', 'Неверный пароль!')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
