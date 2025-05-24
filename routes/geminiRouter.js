const express=require('express')
const router=express.Router()
const uploadFunctionality=require('../controllers/uploadfunctionalityController')
const GeminiController=require('../controllers/geminiPromotController')

router.post('/v1/askGemini',GeminiController.isLoggedin,uploadFunctionality.upload.single('resume'), uploadFunctionality.uploadFunctionality, GeminiController.promptController)

module.exports=router