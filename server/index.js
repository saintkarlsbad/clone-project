require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      controller = require('./controller'),
      Auth0Strategy = require('passport-auth0'),
      passport = require('passport'), 
      checkForSession = require('./checkForSession');


const app = express();

app.use( express.static( `${__dirname}/../build` ) );

const {
      SERVER_PORT,
      SESSION_SECRET,
      CALLBACK_URL,
      DOMAIN,
      CLIENT_ID,
      CLIENT_SECRET,
      CONNECTION_STRING
      } = process.env

app.use(bodyParser.json()) /// read JSON from the request body

app.use(session({ // configuration parameter
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true
  }))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done){
      const db = app.get('db')
      const cabinUserData = profile._json

      db.find_user([profile.id]).then(user => {
            if (!user[0]) {
                  db.create_user([profile.id, cabinUserData.given_name, cabinUserData.family_name]).then(user => {
                       done(null, user[0].id) 
                  })
            } else {
                  done(null, user[0].id)
            }
      })
      console.log(profile, 'profile db info')
}))

passport.serializeUser((id, done) => {
      console.log('serialized user to session')
      done(null, id)
})

passport.deserializeUser((id, done) => {
      const db = app.get('db')
      db.find_session_user([id]).then(user => {
            done(null, user[0]);
      })
})

/// ===== AUTHENTICATION ENDPOINTS ===== ///

app.get('/auth/login', passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0', {
      successRedirect: process.env.SUCCESS_REDIRECT, 
      failureRedirect: process.env.FAILURE_REDIRECT
}))
///^^^ get auth logout info from AUTH0 site

app.get('/auth/authenticated', (req, res) => {
      if (req.user) {
            res.status(200).send(req.user)
      } else {
            res.status(401).send('Not authorized, please login.')
      }
      console.log(req.user, 'user authorized')
})


/// ===== USER ENDPOINTS ==== ///
app.get('/api/getUser', controller.getUser)

/// ===== RESERVATION ENDPOINTS ===== ///

app.get('/getUserReservations', controller.getUserReservations);
app.get('/editReservation/:reservation_id', controller.editReservation);
app.put('/updateReservation/:reservation_id', controller.updateReservation)
app.post('/createReservation/:reservation_id', controller.createReservation)
app.delete('/cancelUserReservation/:reservation_id', controller.cancelUserReservation);


massive(process.env.CONNECTION_STRING).then(db => {
      console.log('--- DATABASE CONNECTED ---')
      app.set('db', db);
      app.listen(SERVER_PORT, () => { console.log('SERVER RUNNING', `Listening on port ${SERVER_PORT}.`) })
})
