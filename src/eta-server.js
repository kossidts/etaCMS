import express from "express";
import url from "url";

import ETA from "./eta-admin/settings.js";
import etaConfig from "./eta-config.js";

const debug = ETA.debugger("server");

const app = express();

// Make helpers available to routes
// app.locals.

// add logger and middelware logger
// TODO: Set the logger middleware after the static file middleware to disable logging for static content requests
// app.use(loggerMiddleware)

// If producation mode
//  - helmet({dnsPrefetchControl: false})
//  - compression()
//  - cookie-session
//  - import { createGzip } from 'zlib';
//  - app.disable('x-powered-by');

// if https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', ...) or app.disable('trust proxy')

/*
Object.assign(headers, {
    'compress': true,
    'Connection': 'keep-alive',
    'Keep-Alive': 'timeout=200'
})

// connection pooling
const http = require('http');
fetch(url, {
    agent: new http.Agent({
        keepAlive: true,
        maxSockets: 24
    })
})
*/

/**
 * Configure the server to serve the static files
 * Static files generates by lasso will be served at /static
 * any other static files will be generated at /eta-public
 *
 * TODO:
 *  - Let a proxy (apache|nginx|...) server static files over a cookieless (sub)domain
 */
const serveStaticOptions = {
    // Disable directory indexing
    index: false,
    //etag: false
};
// app.use('/static', express.static(app.locals.getPath('public', 'dist'), serveStaticOptions));
// app.use("/eta-public", express.static(app.locals.getPath("public", "assets"), serveStaticOptions));
app.use("/eta-public", express.static(url.fileURLToPath(ETA.appRoot + "eta-public"), serveStaticOptions));

/**
 * Quick response
 * --------------------------------------------
 * - No content requests - we don't want to generate data for such requests
 * - TODO: serve favicon
 */
app.get(["/favicon.ico", "/apple-touch-icon-precomposed.png", "/robots.txt", "/*.map"], (req, res) => {
    res.sendStatus(204);
});

/**
 * @param {string} path
 * @param {object} props
 */
async function loadETAComponent(path, props) {
    const Component = await import(path).then(module => module.default);
    const content = new Component(props).render();
    return content;
    // return Buffer.from(content);
}
// function loadETAComponent(path, props) {
//     return import(path).then(module => {
//         const content = new module.default(props).render();
//         return Buffer.from(content);
//     });
// }

// Load installer
// const etaInstaller = require(app.locals.getPath('libs', 'installer.js'));
// etaInstaller(app, {});
let trafficCounter = 0;
app.get("/", async (req, res) => {
    console.log("traffic count", ++trafficCounter);
    // const Layout = await import("./eta-components/Layout.js").then(module => module.default);
    // const htmlContent = new Layout(layoutProps).render();
    const layoutProps = { content: "Hallo ETA!", title: "Home" };
    const htmlContent = await loadETAComponent("./eta-components/Layout.js", layoutProps);
    //res.setHeader("content-type", "text/html");
    //res.marko(templates.start, renderOptions)
    // template.render(renderOptions, res);
    // loadETAComponent("./eta-components/Layout.js", layoutProps).then(buffer => {
    //     res.write(buffer);
    //     res.end();
    // });
    res.write(htmlContent);
    res.end();
});

/**
 * Handler dynamic urls and 404
 * --------------------------------------------
 * - check for dynamic urls which may be located in the DB
 */
app.use(function (req, res, next) {
    // const loggerMeta = {
    //     requestIp: req.ip,
    //     requestMethod: req.method,
    //     requestUrl: req.originalUrl,
    //     status: 2000,
    // };
    // logger.info('Will start streaming the home page %d %s, %o', 123, 'test', {something: true}, loggerMeta)

    /*
    req.hostname

    // ip black/white-listing
    req.ip
    req.ips

    req.protocol
        req.protocol === 'https' is equivalent to req.secure === true
    req.method
    req.originalUrl
    req.baseUrl
    req.path
    req.url (inherited from node http module)

    // get http request header:
    req.get('content-type')
    req.header('content-type') // alias

    req.query

    req.cookie
    req.signedCookies

    req.subdomains
    use local based subdomain e.g. en.goyax.de en.www.domain.de  -> locale first
    req.acceptsLanguages(lang [, ...])

    res.headersSent

    res.cookie('name', 'tobi', {
        domain: 'www.example.com',
        path: '/admin',
        secure: true,
        // Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
        expires: new Date(Date.now() + 900000),
        // Convenient option for setting the expiry time relative to the current time in milliseconds.
        //maxAge: 3600000
        httpOnly: true,
        signed: true|false
    })
    res.clearCookie('name', { path: '/admin' })

    For example, when :user is present in a route path, you may map user loading logic to automatically provide req.user to the
    //router.param(['user', 'id', 'file'], function (req, res, next, id, paramName) {
    router.param('user', function (req, res, next, id, paramName) {
      // try to get the user details from the User model and attach it to the request object
      User.find(id, function (err, user) {
        if (err) {
          next(err)
        } else if (user) {
          req.user = user
          next()
        } else {
          next(new Error('failed to load user'))
        }
      })
    })

    res.download('/report-12345.pdf', 'report.pdf', function (err) {
      if (err) {
        // Handle error, but keep in mind the response may be partially-sent
        // so check res.headersSent
      } else {
        // decrement a download credit, etc.
      }
    })

    app.get('/user/:uid/photos/:file', function (req, res) {
      var uid = req.params.uid
      var file = req.params.file

      req.user.mayViewFilesFrom(uid, function (yes) {
        if (yes) {
          res.sendFile('/uploads/' + uid + '/' + file)
        } else {
          res.status(403).send("Sorry! You can't see that.")
        }
      })
    })

    app.get('/file/:name', function (req, res, next) {
      var options = {
        root: path.join(__dirname, 'public'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }

      var fileName = req.params.name
      res.sendFile(fileName, options, function (err) {
        if (err) {
          next(err)
        } else {
          console.log('Sent:', fileName)
        }
      })
    })

    res.set({
      'Content-Type': 'text/plain',
      'Content-Length': '123',
      'ETag': '12345'
    })
    // alised as res.header(field [, value]).

    res.location(path) // path: 'back', '/path/to' (relative), 'http://...' (fqdn)
    res.redirect([status,] path) // 'back', relative to root, fqdn, relative to current path missing first '/'

    Route path: /user/:userId(\d+)
    Request URL: http://localhost:3000/user/42
    req.params: {"userId": "42"}

    Route path: /plantae/:genus.:species
    Request URL: http://localhost:3000/plantae/Prunus.persica
    req.params: { "genus": "Prunus", "species": "persica" }

    Route path: /flights/:from-:to
    Request URL: http://localhost:3000/flights/LAX-SFO
    req.params: { "from": "LAX", "to": "SFO" }
    */

    const err = new Error("Not Found");
    // err.status = 404;
    next(err);
});

/**
 * Error handler
 * --------------------------------------------
 */
app.use(function (err, req, res, next) {
    debug(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = !ETA.isProduction ? err : {};

    if (res.headersSent) return next(err);

    // req.xhr for requests made by using XHR
    if (req.xhr) {
        res.status(500).send({ success: false, error: "Something went wrong!" });
    } else {
        next(err);
    }

    if (err.stack) console.error(err.stack);
    res.status(err.status || 500).send("error");
});

const init = () => {
    app.listen(etaConfig.PORT, () => {
        debug(`Server listening on port ${etaConfig.PORT}`);
    });
};

export default { init, app };
