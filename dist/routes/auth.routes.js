"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const user_contoller_1 = require("../controllers/user.contoller");
const Like_controller_1 = require("../controllers/Like.controller");
const Seguimiento_controller_1 = require("../controllers/Seguimiento.controller");
const comentario_controller_1 = require("../controllers/comentario.controller");
const post_controller_1 = require("../controllers/post.controller");
const img_controller_1 = require("../controllers/img.controller");
const message_controller_1 = require("../controllers/message.controller");
const chat_controller_1 = require("../controllers/chat.controller");
const story_controller_1 = require("../controllers/story.controller");
//endpoints para users
router.post('/signup', user_contoller_1.signUp);
router.post('/signin', user_contoller_1.signIn);
router.post('/finduser', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.FindUser);
router.post('/edituser', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.edituser);
router.post('/editpass', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.editpassword);
router.post('/changepic', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.ChangePic);
//enpoints para posts
router.post('/newpost', passport_1.default.authenticate('jwt', { session: false }), post_controller_1.newPost);
router.post('/showAllPosts', [passport_1.default.authenticate('jwt', { session: false }), post_controller_1.showAllPosts]);
router.post('/showuserposts', passport_1.default.authenticate('jwt', { session: false }), post_controller_1.showUserPost);
router.post('/searchpost', passport_1.default.authenticate('jwt', { session: false }), post_controller_1.searchPost);
router.post('/showSinglePost', passport_1.default.authenticate('jwt', { session: false }), post_controller_1.showSinglePost);
router.post('/showfollowing', passport_1.default.authenticate('jwt', { session: false }), post_controller_1.ShowFollowingPosts);
//enpoints para imagenes 
router.post('/newimg', passport_1.default.authenticate('jwt', { session: false }), img_controller_1.NewImg);
router.post('/showPostImgs', passport_1.default.authenticate('jwt', { session: false }), img_controller_1.showPostImgs);
router.post('/like', passport_1.default.authenticate('jwt', { session: false }), Like_controller_1.AddOrRemoveLike);
router.post('/getlikes', passport_1.default.authenticate('jwt', { session: false }), Like_controller_1.GetLikes);
router.post('/checklike', passport_1.default.authenticate('jwt', { session: false }), Like_controller_1.CheckLike);
//endpoints para followers
router.post('/follow', passport_1.default.authenticate('jwt', { session: false }), Seguimiento_controller_1.followorunfollow);
router.post('/getfollowers', passport_1.default.authenticate('jwt', { session: false }), Seguimiento_controller_1.GetFollowers);
router.post('/getFollowing', passport_1.default.authenticate('jwt', { session: false }), Seguimiento_controller_1.GetFollowing);
router.post('/checkfollow', passport_1.default.authenticate('jwt', { session: false }), Seguimiento_controller_1.CheckFollow);
//endpoints para comentarios
router.post('/newComentario', passport_1.default.authenticate('jwt', { session: false }), comentario_controller_1.NuevoComentario);
router.post('/getcomentarios', passport_1.default.authenticate('jwt', { session: false }), comentario_controller_1.getComentarios);
router.post('/getcomentariosnumber', passport_1.default.authenticate('jwt', { session: false }), comentario_controller_1.GetNumeroDeComentarios);
router.post('/deletecomentario', passport_1.default.authenticate('jwt', { session: false }), comentario_controller_1.DeleteComentario);
//enpoints para mensajes
router.post('/newmessage', passport_1.default.authenticate('jwt', { session: false }), message_controller_1.newMessage);
router.post('/searchMessages', passport_1.default.authenticate('jwt', { session: false }), message_controller_1.searchMessages);
//chats
router.post('/showchats', passport_1.default.authenticate('jwt', { session: false }), chat_controller_1.ShowChats);
router.post('/newchat', passport_1.default.authenticate('jwt', { session: false }), chat_controller_1.newChat);
//storys
router.post('/neworupdatestory', passport_1.default.authenticate('jwt', { session: false }), story_controller_1.neworUpdateStory);
router.post('/showstorys', passport_1.default.authenticate('jwt', { session: false }), story_controller_1.showAllStorys);
exports.default = router;
