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
exports.ShowFollowingStorys = exports.showSingleStory = exports.searchStory = exports.showUserStory = exports.showAllStorys = exports.neworUpdateStory = void 0;
const Seguimiento_1 = __importDefault(require("../models/Seguimiento"));
const story_1 = __importDefault(require("../models/story"));
//Crear Story
const neworUpdateStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.descripcion && req.body.foto == 'undefined') {
        return res.status(400).json({ msg: "El Story no puede estar Vacio" });
    }
    //GUARDAR Story
    const historia = yield story_1.default.find({ owner: req.body.owner });
    if (historia.length == 0) {
        const newStory = new story_1.default(req.body);
        yield newStory.save();
        return res.status(201).json(newStory);
    }
    const actualizar = yield story_1.default.findOneAndUpdate({ owner: req.body.owner }, { descripcion: req.body.descripcion, foto: req.body.foto });
    return res.status(201).json(actualizar);
});
exports.neworUpdateStory = neworUpdateStory;
const showAllStorys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Storys = yield story_1.default.find().sort({ fecha: 'desc' });
    return res.status(200).json(Storys);
});
exports.showAllStorys = showAllStorys;
const showUserStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Storys = yield story_1.default.find({ owner: req.body.owner }).sort({ fecha: 'desc' });
    if (!Storys) {
        return res.status(400).json({ msg: "el usuario no tiene Storys" });
    }
    console.log(Storys);
    return res.status(201).json({ Storys });
});
exports.showUserStory = showUserStory;
const searchStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Storys = yield story_1.default.find({ $text: { $search: req.body.descripcion } });
    if (!Storys) {
        return res.status(400).json({ msg: "El Storys que busco no existe" });
    }
    console.log(Storys);
    return res.status(201).json({ Storys });
});
exports.searchStory = searchStory;
const showSingleStory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const historia = yield story_1.default.findOne({ _id: req.body.Storyid });
    if (!historia) {
        return res.status(400).json({ msg: "El Story que busco no existe" });
    }
    console.log(story_1.default);
    return res.status(201).json(historia);
});
exports.showSingleStory = showSingleStory;
const ShowFollowingStorys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busqueda = yield Seguimiento_1.default.find({ idSeguidor: req.body.userid });
    let result = [];
    for (let i = 0; i < busqueda.length; i++) {
        const Storys = yield story_1.default.find({ owner: busqueda[i].idSeguido });
        result = result.concat(Storys);
    }
    let allStorys = result.sort(function (a, b) {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
    return res.status(200).json(allStorys);
});
exports.ShowFollowingStorys = ShowFollowingStorys;
