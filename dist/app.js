"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const private_routes_1 = __importDefault(require("./routes/private.routes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
//inicio
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// settings
app.set('port', process.env.PORT || 3000);
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
app.get('/', (req, res) => {
    return res.send(`La API esta en http://localhost:${app.get('port')}`);
});
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    console.log('nueva conecxion por socket');
    console.log(socket.id);
    socket.on('mensaje', (palabra) => {
        socket.broadcast.emit('mensaje', {
            body: palabra,
        });
    });
});
server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *', app.get('port'));
});
app.use(auth_routes_1.default);
app.use(private_routes_1.default);
exports.default = app;
