# MEAN Stack Starter Kit

A MEAN Stack Starter Kit app built with MongoDB, Angular, Node.js Express framework. For demonstration purposes and a tutorial.

Node provides the RESTful API. Angular provides the frontend and accesses the API. MongoDB provides document database.

## Features & Highlights

- Frontend development using [angularjs][angularjs].
- Angular Js Routing using [angular-ui-router][angular-ui-router].
- Node.js web application framework i.e [express][expressjs] frameworks for RESTful API etc.
- User Authentication using [passport][passportjs], authentication middleware for Node.js to authenticate requests.
- NoSQL Database [mongodb][mongodb] , [mongoose][mongoosejs] elegant mongodb object modeling for node.js.
- JSON Web Token for Authentication using [express-jwt][express-jwt]. Read more on [jwt][jwt].
- HTTP Interceptors for intercept requests like global error handling, authentication [http-interceptors][http-interceptors].
- Angular Pagination using [ngTasty][ng-tasty]
- [ocLazyLoad][oclazyload] load angular modules, conmponents (controllers/services/filters/)

## Prerequisites

- GIT to clone the `mean-starter-kit` repository, you can get git from  [here][git-home]
- Install [Node.js][node-download] on your machine.
- Install [Bower][bower] globally by using `npm install -g bower`
- Install MongoDB, you can get installation guide from [MongoDB][mongodb]


## Configuration

- MongoDB: Make sure you have your own local or remote MongoDB database URI configured in `config/database.js`
- You can configure localhost listening port in `server.js` file 

```
var port = 8886; // default port = 8886
```

## Installation

1. Clone the repository: `git clone git@github.com:scotch-io/node-todo`
2. Install the application: `npm install`
3. Place your own MongoDB URI in `config/database.js`
3. Start the server: `node server.js`
4. View in browser at `http://localhost:8886`


[bower]: http://bower.io/
[git-home]: https://git-scm.com
[git-setup]: https://help.github.com/articles/set-up-git/
[google-phone-gallery]: http://web.archive.org/web/20131215082038/http://www.android.com/devices/
[jasmine]: https://jasmine.github.io/
[karma]: https://karma-runner.github.io
[node-download]: https://nodejs.org/en/download/
[angularjs]: https://angularjs.org/
[angular-ui-router]: https://github.com/angular-ui/ui-router
[expressjs]: http://expressjs.com/
[passportjs]: http://passportjs.org/docs
[mongodb]: https://www.mongodb.com
[mongoosejs]: http://mongoosejs.com/
[jwt]: https://jwt.io/introduction/
[express-jwt]: https://www.npmjs.com/package/express-jwt 
[http-interceptors]: https://docs.angularjs.org/api/ng/service/$http
[ng-tasty]: https://github.com/Zizzamia/ng-tasty
[oclazyload]: https://oclazyload.readme.io/
[mongodb]: https://docs.mongodb.com/manual/installation/


