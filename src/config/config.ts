export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB:{
        URI: "mongodb+srv://RokkerMomo:N9pvz0ienbk7sHS4@moviles.jtb75kq.mongodb.net/Instagram",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }//railway
}