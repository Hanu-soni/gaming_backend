const express = require('express');
const { addGamingData, readGamingData, updateChoiceStatus } = require('../controllers/gaming.controller');
const router = express.Router();


router.post('/',addGamingData);
router.get('/',readGamingData);
router.post('/prop_selection',updateChoiceStatus);



module.exports=router;