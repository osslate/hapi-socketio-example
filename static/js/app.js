/*
    client-side socket.io/ractive stuff
*/

var socket;

var SocketIOTest = Ractive.extend({
    template: "app",
    init: function (options) {
        this.on("ping", function () {
            socket.emit("ping", this.get("text"))
            this.set("text", "")
        })
    }
})

var app = new SocketIOTest({
    el: "container",
    template: "#app",
    data: {
        welcome: {
            message: "connecting...",
            version: "unknown"
        },
        connected: false,
        messages: []
    }
})

socket = io.connect("http://localhost:8080")

socket.on("connect", function () {
    app.set("connected", true)
})

socket.on("welcome", function (data) {
    app.set("welcome.message", data.message)
    app.set("welcome.version", data.version)
})

socket.on("pong", function (data) {
    var messages = app.get("messages")
    messages.push(data)
})
