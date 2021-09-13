const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res) => {
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res) => {
    const {title,body} = req.body
    if(!title || !body) {
        return res.status(422).json({error:"please add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin, (req, res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

// happy unhappy
router.put('/happy',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{happy:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unhappy',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{happy:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// sad
router.put('/sad',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{sad:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unsad',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{sad:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// angry
router.put('/angry',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{angry:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unangry',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{angry:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


// like unlike
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


module.exports = router