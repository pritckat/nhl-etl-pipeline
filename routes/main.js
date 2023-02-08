const express = require('express');
const homeController = require('../controllers/home')

const router = express.Router()

router.get('/', homeController.getIndex)
router.post('/submit', homeController.submit);
router.post('/playersubmit', homeController.playerSubmit);
router.post('/teamsubmit', homeController.teamSubmit);
module.exports = router