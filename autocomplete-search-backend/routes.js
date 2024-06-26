const express=require('express');
const router=express.Router();
const{searchQuerry, getBookData, home} =require('./controller')

router.route('/').get(home)
router.route('/search').post(searchQuerry);
router.route('/getBookData').get(getBookData);

module.exports=router;
