// create express.js API endpoints
const router = require('express').Router();

const{Post,User} = require('../../models');
const { get, post } = require('./user-routes');
// const { router} = require('./user-routes');

// get all users

router.get('/',(req,res)=>{
console.log('======================');
Post.findAll({
    // Query configuration
    // customize the attributes property
attributes:['id','post_url','title','created_at'],
order:[['created_at','DESC']],
include:[
  {
    model:User,
    attributes:['username']
  }
]
})
.then(dbPostData => res.json(dbPostData))
.catch(err =>{
    console.log(err);
    res.status(500).json(err);
});





});
// creating a route for individual user using id
 router.get('/:id',(req,res)=>{

    Post.findOne({
   where:{
    id:req.params.id
   },
  attributes:['id','post_url','title','created_at'],

  include:[
    {
        model:User,
        attributes:['username']
    }
  ]
 })
  .then(dbPostData=>{
    if(!dbPostData){
        res.status(404).json({
            message:'No post found with this id'
        
        });
        return;
    }
   res.json(dbPostData);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });

 });

//  create a post route to post the comment 
 
router.post('/',(req,res)=>{
    // expect {title:'Taskmaster goes public!,post_url:'https://taskmaster.com/press'}
    Post.create({
        title:req.body.title,
        post_url:req.body.post_url,
        user_id:req.body.user_id
    })

.then(dbPostData=>res.json(dbPostData))
.catch(err=>{
    console.log(err);
    res.status(500).json(err);
});
});

// create route to update the Post title

router.put('/:id',(req,res)=>{

    Post.update({
        title:req.body.title
    },
    {
        where:{
            id:req.params.id
        }
    }
    )
    .then(dbPostData=>{
        if(!dbPostData){
            res.status(404).json({message:'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });

});

// create a delete route to delete post

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});




module.exports = router;