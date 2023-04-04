"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAllPosts = exports.newPost = void 0;
const post_1 = __importDefault(require("../models/post"));
//Crear Post
const newPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.descripcion && req.body.foto == 'undefined') {
        return res.status(400).json({ msg: "El Post no puede estar Vacio" });
    }
    //GUARDAR Post
    const newPost = new post_1.default(req.body);
    yield newPost.save();
    return res.status(201).json(newPost);
});
exports.newPost = newPost;
const showAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_1.default.find().sort({ fecha: 'desc' });
    return res.status(200).json(posts);
});
exports.showAllPosts = showAllPosts;
