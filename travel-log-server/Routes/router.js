const express=require('express')

const router=new express.Router();


const userController=require('../Controllers/userController')
const travelController=require('../Controllers/travelController')
const reviewController=require('../Controllers/reviewController')
const profileController=require('../Controllers/profileController')
const jwtMiddleware = require('../Midlewares/jwtMiddleware');
const multerConfig=require ('../Midlewares/multerMiddleware')

router.post('/user/register',userController.register)

router.post('/user/login',userController.login)

router.post('/place/add',jwtMiddleware,multerConfig.single('placeimg'),travelController.addplaces)

router.get('/place/userplaces',jwtMiddleware,travelController.getuserplaces)

router.put('/place/editplace/:id',jwtMiddleware,multerConfig.single('placeimg'),travelController.editplace)

router.delete('/place/remove/:id',jwtMiddleware,travelController.deleteUserPlace)

router.get('/place/allplace',jwtMiddleware,travelController.getallplaces)

router.get('/place/allplacenosearch/:id',jwtMiddleware,travelController.getallplacesnosearch)

router.post('/place/add-review',jwtMiddleware,reviewController.addreviews)

router.get('/place/review',jwtMiddleware,reviewController.getplacereview)

router.get('/place/usereview',jwtMiddleware,reviewController.getuserreviews)

router.put('/place/editreview/:id',jwtMiddleware,reviewController.updateuserreview)

router.delete('/place/removereview/:id',jwtMiddleware,reviewController.deleteUserreview)

router.post('/profile/add',jwtMiddleware,multerConfig.single("profileimg"),profileController.addprofile)

router.get('/profile/user-profile',jwtMiddleware,profileController.getuserprofile)

router.put('/profile/update-profile/:id',jwtMiddleware,multerConfig.single("profileimg"),profileController.updateuserprofile)

router.delete('/profile/remove-profile/:id',jwtMiddleware,profileController.deleteUserProfile)


module.exports=router;
