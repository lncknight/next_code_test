const 
  { find, get } = require('lodash'),
  axios = require('axios'),
  dotenv = require('dotenv')

dotenv.config()

const
  port = process.env.PORT || 8081
  ;

var express = require('express');
const { default: Axios } = require('axios');
var app = express();

let users = [
  {
    name: 'lawrence',
    pass: '1234',
  },
  {
    name: 'admin',
    pass: 'demo1234'
  },
  {
    name: 'candidate-1024',
    pass: 'yD74534SXFdFRqW'
  },
  {
    name: 'candidate-2049',
    pass: 'kH4Xs6bJKv2QeU7'
  },
  {
    name: 'candidate-1028',
    pass: 'kH4Xs6bJK'
  },
]


var basicAuth = require('basic-auth');
var auth = function (req, res, next) {
  var authUser = basicAuth(req);

  let user = find(users, {
    name: get(authUser, 'name'),
    pass: get(authUser, 'pass')
  })

  // https://webhook.site/#!/bb1daf02-849e-42db-8f10-a97ae81ea25b/c105c6c4-92aa-47b5-b98e-f546a608337b/1
  if (user) {
    axios.post('https://webhook.site/bb1daf02-849e-42db-8f10-a97ae81ea25b', {
      data: {
        user
      }
    })
    return next();
  }
  else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.status(401)
    return res.send();
  }
}

app.use(function (req, res, next) {
  if (req.path === '/') {
    return auth(req, res, next);
  }
  else
    next();
});


app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
