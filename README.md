# A RiotJS example application
It's basically a clone of [RiotJS todo example](https://github.com/riot/examples/tree/gh-pages/todo-app)
but it has a tiny RESTfull backend and supports WebSockets a bit.

In one console combine the front-end and start the live update of it.
```
$ git clone https://sergey-anisimov/riotjs-example
$ cd riotjs-example
$ npm install
$ gulp (or gulp.cmd on Windows)
```
In another console start the NodeJS mini server.
```
$ node ./server/server.js
```
Open [http://localhost:8000](http://localhost:8000) in your browser.
Open [http://localhost:8000](http://localhost:8000) on another tab (or browser).

Try to add some todos and observe them appearing on both tabs.
