const express = require('express')
const router = express.Router()
const passport = require('passport');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');


// @route POST api/posts
// @desc create new post
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    

    const {errors, errorsFound} = validatePostInput(req.body);
    if(errorsFound) {
        return res.status(400).json(errors);
    } 

    const newPost = new Post({
        user: req.user._id,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
    });

    newPost.save()
        .then(post => res.status(201).json(post))
        .catch(err => res.json(err));
});


// @route GET api/posts
// @desc get all posts
// @access Public
router.get('/', (req, res) => {

    Post.find()
        .sort({date: -1})
        .then(posts => {
            return res.status(200).json(posts);
        })
        .catch(err => res.json(err));
});


// @route GET api/posts/:post_id
// @desc get one post by id
// @access Public
router.get('/:post_id', (req, res) => {

    Post.findById(req.params.post_id)
        .then(post => res.status(200).json(post))
        .catch(err => res.status(404).json({error: 'Post not found'}));
});


// @route DELETE api/posts/:post_id
// @desc delete one post by id
// @access Private
router.delete('/:post_id', passport.authenticate('jwt', {session:false}), (req, res) => {

    Post.findOne({user: req.user._id, _id:req.params.post_id})
        .then((post) => {
            
            if(post) {
                post.remove().then(() => res.status(200).json({sucess:true}));
            }
            else {
                return res.status(401).json({noaccess: 'Unauthorized to delete this post'})
            }

        })
        .catch((err) => res.json(err));
    
});


// @route POST api/posts/like/:post_id
// @desc like a post
// @access Private
router.post('/like/:post_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Post.findOne({_id: req.params.post_id})
        .then(post => {
            let found_user = false;

            post.likes.map(like => {
                if(like.user.toString() === req.user._id.toString()) {
                    found_user = true
                    return res.status(400).json({error: 'you already liked the post'});
                }
            });


            if(found_user == false) {
                post.likes.push({user: req.user._id});

                post.save()
                    .then(() => res.json({success: 'liked post successfully'}))
                    .catch(err => res.json(err));
            }
            
        })
        .catch(err => res.json(err));
});


// @route POST api/posts/unlike/:post_id
// @desc unlike a post
// @access Private
router.post('/unlike/:post_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Post.findOne({_id: req.params.post_id})
    .then(post => {
        
        let found_user = false;

        post.likes.map((like, i) => {
            if(like.user.toString() === req.user._id.toString()) {
                
                found_user = true;

                post.likes.splice(i,1);

                post.save()
                    .then(() => res.json({success: 'unliked post successfully'}))
                    .catch(err => res.json(err));
            }

        });

        if(found_user == false) {
            return res.status(400).json({error: 'you didn\'t like the post so you can\'t unliked it'});
        }
    })
    .catch(err => res.json(err));
});


// @route POST api/posts/comment/:post_id
// @desc comment on a post
// @access Private
router.post('/comment/:post_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    
    // comment has the same validation as post
    const {errors, errorsFound} = validatePostInput(req.body);
    if(errorsFound) {
        return res.status(400).json(errors);
    } 
    
    Post.findOne({_id: req.params.post_id})
        .then(post => {
           
            post.comments.unshift({
                user: req.user._id,
                text: req.body.text,
                name: req.user.name,
                avatar: req.user.avatar
            });    
            
            post.save()
                .then(() => res.status(201).json({msg: 'comment posted successfully'}))
                .catch(err => res.json(err));
        
        })
        .catch(err => res.json(err));
});



// @route DELETE api/posts/comment/:post_id
// @desc delete comment on a post
// @access Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    
    
    Post.findOne({_id: req.params.post_id})
        .then(post => {

            let found_user_and_comment = false

            post.comments.map((comment, i) => {
                if(comment.user.toString() === req.user._id.toString() && comment._id.toString() === req.params.comment_id) {
                    found_user_and_comment = true;
                    post.comments.splice(i,1);
                    post.save()
                        .then(() => res.status(200).json({msg: 'comment deleted successfully'}))
                        .catch(err => res.json(err));
                }   
            })
            
            if(found_user_and_comment == false) {
                return res.status(401).json({noaccess: 'can\'t delete this comment'});
            }

            

        })
        .catch(err => res.json(err));
});


module.exports = router;