import {Router} from 'express'

import passport, { session } from 'passport'

const router = Router()

import { ChangePic, deleteUser, editpassword, edituser, FindUser, signIn,signUp } from '../controllers/user.contoller';
import { AddOrRemoveLike, CheckLike, GetLikes } from '../controllers/Like.controller';
import { CheckFollow, followorunfollow, GetFollowers, GetFollowing } from '../controllers/Seguimiento.controller';
import { DeleteComentario, getComentarios, GetNumeroDeComentarios, NuevoComentario } from '../controllers/comentario.controller';
import { newPost, searchPost, showAllPosts, ShowFollowingPosts, showSinglePost, showUserPost } from '../controllers/post.controller';
import { NewImg, showPostImgs } from '../controllers/img.controller';
import { newMessage, searchMessages } from '../controllers/message.controller';
import { newChat, ShowChats } from '../controllers/chat.controller';
import { neworUpdateStory, showAllStorys } from '../controllers/story.controller';
 
//endpoints para users
router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/finduser',passport.authenticate('jwt', {session:false}),FindUser)
router.post('/edituser',passport.authenticate('jwt', {session:false}),edituser)
router.post('/editpass',passport.authenticate('jwt', {session:false}),editpassword)
router.post('/changepic',passport.authenticate('jwt', {session:false}),ChangePic)

//enpoints para posts
router.post('/newpost',passport.authenticate('jwt', {session:false}),newPost)
router.post('/showAllPosts',[passport.authenticate('jwt',{session:false}),showAllPosts])
router.post('/showuserposts',passport.authenticate('jwt', {session:false}),showUserPost)
router.post('/searchpost',passport.authenticate('jwt', {session:false}),searchPost)
router.post('/showSinglePost',passport.authenticate('jwt', {session:false}),showSinglePost)
router.post('/showfollowing',passport.authenticate('jwt',{session:false}),ShowFollowingPosts)
//enpoints para imagenes 
router.post('/newimg',passport.authenticate('jwt', {session:false}),NewImg)
router.post('/showPostImgs',passport.authenticate('jwt',{session:false}),showPostImgs)

router.post('/like',passport.authenticate('jwt', {session:false}),AddOrRemoveLike)
router.post('/getlikes',passport.authenticate('jwt', {session:false}),GetLikes)
router.post('/checklike',passport.authenticate('jwt', {session:false}),CheckLike)

//endpoints para followers
router.post('/follow',passport.authenticate('jwt', {session:false}),followorunfollow)
router.post('/getfollowers',passport.authenticate('jwt', {session:false}),GetFollowers)
router.post('/getFollowing',passport.authenticate('jwt', {session:false}),GetFollowing)
router.post('/checkfollow',passport.authenticate('jwt', {session:false}),CheckFollow)

//endpoints para comentarios
router.post('/newComentario',passport.authenticate('jwt', {session:false}),NuevoComentario)
router.post('/getcomentarios',passport.authenticate('jwt', {session:false}),getComentarios)
router.post('/getcomentariosnumber',passport.authenticate('jwt', {session:false}),GetNumeroDeComentarios)
router.post('/deletecomentario',passport.authenticate('jwt', {session:false}),DeleteComentario)

//enpoints para mensajes
router.post('/newmessage',passport.authenticate('jwt', {session:false}),newMessage)
router.post('/searchMessages',passport.authenticate('jwt', {session:false}),searchMessages)
 
//chats
router.post('/showchats',passport.authenticate('jwt',{session:false}),ShowChats)
router.post('/newchat',passport.authenticate('jwt',{session:false}),newChat)

//storys
router.post('/neworupdatestory',passport.authenticate('jwt',{session:false}),neworUpdateStory)
router.post('/showstorys',passport.authenticate('jwt',{session:false}),showAllStorys)
export default router;