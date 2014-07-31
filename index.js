var Hapi = require("hapi")

var app = Hapi.createServer(8080)
var io = require("socket.io")(app.listener)

/*
    handle socket.io connections
*/

var ioHandler = function (socket) {
    socket.emit("welcome", {
        message: "Hello from Hapi!",
        version: Hapi.version
    })

    // simple echo service
    var pingHandler = function(data) {
        socket.emit("pong", data)
    }

    socket.on("ping", pingHandler)
}

io.on("connection", ioHandler)

/*
    serve our static files
*/

app.route({
    path: "/{static*}",
    method: "GET",
    handler: {
        directory: {
            path: "./static"
        }
    }
})

app.start(function () {
    console.log("socket.io example @", app.info.uri)
})
