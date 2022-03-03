const express = require('express');
const router = express.Router();
const fetchuser = require ('../midleware/fetchuser')
const Note = require ('../models/Note')
const { body, validationResult } = require('express-validator');


// Route1: get all notes using:POST logi required

router.get('/fetchallnotes',fetchuser,
 async(req,res)=>{
     try {
    const note = await Note.find({user:req.user.id})
    res.json(note)
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
})
// Route2: Add all notes using:POST login required

router.post('/addnotes',fetchuser,
[
    body('title',"Enter a valid title").isLength({min:3}),
    body('description',"description  must be at least 5 characters").isLength({ min: 5 })] 
 ,async(req,res)=>{
     const{title,description,tag}=req.body
     // if there are errors,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
        const note= new Note({
            title,description,tag,user:req.user.id
        })
        const savedNote = await note.save();
    res.json(savedNote)
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
})

//Route 3: Update A Existing Note using:POST "/api/note/updatenote". login required
router.put('/updatenote/:id',fetchuser
 ,async(req,res)=>{
     try {
         
    
     const {title,description,tag}=req.body
/// create a new object
     const newNote = {}
     if(title){newNote.title=title}
     if(description){newNote.description=description}
     if(tag){newNote.tag=tag}

    //  find the note to be update and update it
    // const note = Note.findByIdAndUpdate()

    let note =await Note.findById(req.params.id)
        if(!note){
        return res.status(404).send("not found")
        }
        if(note.user.toString()!==req.user.id)
        {
            return res.status(401).send("not allowed")
            }
            note =await Note.findByIdAndUpdate(req.params.id ,{$set:newNote},{new:true})
            res.json({note})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured");
          }
 })
 //Route 4: Delete A Existing Note using:delete "/api/note/deleteenote". login required
router.delete('/deletenote/:id',fetchuser
,async(req,res)=>{ 
try {
   //  find the note to be update and update it
   // const note = Note.findByIdAndUpdate()
   let note =await Note.findById(req.params.id)
       if(!note){
       return res.status(404).send("not found")
       }
       if(note.user.toString()!==req.user.id)
       {
           return res.status(401).send("not allowed")
           }
    note =await Note.findByIdAndDelete(req.params.id)
           res.json({"success":"Notes has be deleted",note:note})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error occured");
          }
})
module.exports=router;