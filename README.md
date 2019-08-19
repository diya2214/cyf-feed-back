CYF Mentor Feedback
===========

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

 - [x] Full stack ES8+ with [Babel]
 - [x] [Express] server
 - [x] [React] client with [Webpack]
 - [x] Linting with [ESLint]
 - [x] Dev mode (watch modes for client and server, proxy to avoid CORS issues)
 - [x] Production build (single deployment artifact, React loaded via CDN)
 - [x] [Heroku] deployment


Scripts
-------

Various scripts are provided in the package file, but many are helpers for other scripts; here are the ones you'll
commonly use:

 - `npm run dev`: starts the frontend and backend in dev mode, with file watching and hot reloading.
 - `npm run lint`: runs ESLint against all the JavaScript in the project.
 - `npm run serve`: builds and starts the app in production mode.

When either `dev` or `serve` is running you can view your app at http://localhost:3000. There is a slight difference
in what's happening in the background, but you don't need to worry about that.


  [Babel]: https://babeljs.io/
  [collaborators]: https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository
  [ESLint]: https://eslint.org/
  [Express]: https://expressjs.com/
  [Heroku]: https://www.heroku.com/
  [Node]: https://nodejs.org/en/
  [React]: https://reactjs.org/
  [Webpack]: https://webpack.js.org/
