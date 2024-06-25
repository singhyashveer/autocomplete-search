const express=require('express');
const router=express.Router();
const{searchQuerry, getBookData} =require('./controller')

router.route('/search').post(searchQuerry);
router.route('/getBookData').get(getBookData);

module.exports=router;
