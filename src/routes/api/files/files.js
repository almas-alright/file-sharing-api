'use strict';
const express = require('express');

const router = express.Router();
const { FILES } = require('../../urls');
const controller = require('../../../controllers/FileController');

router.post(FILES.POST_FILE, controller.uploadFile);
router.get(FILES.GET_FILE, controller.getFile);
router.delete(FILES.DELETE_FILE, controller.deleteFile);

module.exports = router;
