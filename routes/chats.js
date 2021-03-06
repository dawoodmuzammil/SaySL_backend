var express = require('express');
var router = express.Router();
multer = require('multer');

const upload = multer({
    'dest': 'uploads/'
});

const { asyncErrorHandler } =    require('../middleware/index');
const { getAllChats, getChat, postVideo, postSendMessage } = require("../controllers/chats");

router.get('/', asyncErrorHandler( getAllChats));

router.get('/:chatId', asyncErrorHandler( getChat));

// ================ VIDEO ================ //
/* GET video-upload page. */
router.post("/:receiverId/sendVideo", upload.single('video'), asyncErrorHandler(postVideo));

// ================ MESSAGE ================ //
router.post('/:receiverId/sendMessage', asyncErrorHandler(postSendMessage));

module.exports = router;
