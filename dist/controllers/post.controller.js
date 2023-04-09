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
exports.ShowFollowingPosts = exports.showSinglePost = exports.searchPost = exports.showUserPost = exports.showAllPosts = exports.newPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const Seguimiento_1 = __importDefault(require("../models/Seguimiento"));
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
const showUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_1.default.find({ owner: req.body.owner }).sort({ fecha: 'desc' });
    if (!posts) {
        return res.status(400).json({ msg: "el usuario no tiene Posts" });
    }
    console.log(posts);
    return res.status(201).json({ posts });
});
exports.showUserPost = showUserPost;
const searchPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Posts = yield post_1.default.find({ $text: { $search: req.body.descripcion } });
    if (!Posts) {
        return res.status(400).json({ msg: "El Posts que busco no existe" });
    }
    console.log(Posts);
    return res.status(201).json({ Posts });
});
exports.searchPost = searchPost;
const showSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_1.default.findOne({ _id: req.body.Postid });
    if (!post) {
        return res.status(400).json({ msg: "El Post que busco no existe" });
    }
    console.log(post);
    return res.status(201).json(post);
});
exports.showSinglePost = showSinglePost;
const ShowFollowingPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busqueda = yield Seguimiento_1.default.find({ idSeguidor: req.body.userid });
    let result = [];
    for (let i = 0; i < busqueda.length; i++) {
        const Posts = yield post_1.default.find({ owner: busqueda[i].idSeguido });
        result = result.concat(Posts);
    }
    let allPosts = result.sort(function (a, b) {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
    return res.status(200).json(allPosts);
});
exports.ShowFollowingPosts = ShowFollowingPosts;
