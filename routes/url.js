const express= require('express');
const {handleGenerateNewShortURl, handleGetAnalatycs} = require('../controllers/url')
const router = express.Router();

router.post('/', handleGenerateNewShortURl)

router.get('/analytics/:shortId', handleGetAnalatycs)

module.exports = router;