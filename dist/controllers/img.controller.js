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
exports.showPostImgs = exports.NewImg = void 0;
const img_1 = __importDefault(require("../models/img"));
const post_1 = __importDefault(require("../models/post"));
const NewImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_1.default.findOne({ _id: req.body.postid });
    if (!post) {
        return res.status(400).json({ msg: 'no existe ese post' });
    }
    //GUARDAR Post
    const NewImg = new img_1.default(req.body);
    yield NewImg.save();
    return res.status(201).json(NewImg);
});
exports.NewImg = NewImg;
const showPostImgs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Imgs = yield img_1.default.find({ postid: req.body.postid });
    if (!Imgs) {
        return res.status(400).json({ msg: 'el post no tiene imagenes o no existe' });
    }
    return res.status(200).json(Imgs);
});
exports.showPostImgs = showPostImgs;
