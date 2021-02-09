# dev
```
yarn dev
```

# heroku deploy
```
APP_NAME=lncknight-code-test
heroku create -a $APP_NAME
heroku git:remote -a $APP_NAME
heroku stack:set container
git push heroku master

# heroku config:set ENV_KEY=VALUE

heroku open
```

# heroku delete
```
heroku apps:delete
 ```
