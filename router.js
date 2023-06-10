const express = require('express');
const Model = require('./FootballTeamModel');
const router = express.Router();
var bodyParser = require('body-parser')
// Get All Players
router.get('/Football', async(req, res)=>{
    try{
        const data = await Model.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});
var jsonParser = bodyParser.json()
// Add a new player
router.post('/Football',jsonParser , async(req, res)=>{
    console.log(req.body);
    const data = new Model({
        name: req.body.name,
        position: req.body.position,
        team: req.body.team,
        stats:{
            rushingyards: req.body.stats.rushingyards,
            touchdownsthrown: req.body.stats.touchdownsthrown,
            sacks: req.body.stats.sacks,
            fieldgoalsmade: req.body.stats.fieldgoalsmade,
            fieldgoalsmissed: req.body.stats.fieldgoalsmissed,
            catches: req.body.stats.catches
        }
    })
    try{
      const datatosave = await data.save();
      res.status(200).json(datatosave);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// Update player by iD
router.patch("/UpdatePlayer/:id", jsonParser,async (req, res)=>{
    console.log(req.body);
    try{
        const id = req.params.id;
        const updatedata = req.body;
        const options = {new: true};
        const result = await Model.findByIdAndUpdate(
            id, updatedata, options
        )
        res.send(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Get player by ID

router.get('/Football/:id', async (req, res)=>{
    try{
        const data = await Model.findById(req.params.id);
        res.json(data);

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// Delete player by ID
router.delete('/DeletePlayer/:id', async (req, res)=>{
    try{
        const data = await Model.findByIdAndDelete(req.params.id);
        // res.send(`Document with ${data.name} has been deleted..`)
        console.log(data);
        res.send("Successfull")
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// Player with most towuchdown passes

router.get('/GetplayerwithMostTouchdownpasses', async(req, res)=>{
    try{
        const data = await Model.find().sort({"stats.touchdownsthrown":-1}).limit(1);
        res.send(data);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

//player with most rushing yards
router.get('/GetplayerwithMostrushingyards', async(req, res)=>{
    try{
        const data = await Model.find().sort({"stats.rushingyards":-1}).limit(1);
        res.send(data);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// Player with least rushing yards
router.get('/GetplayerwithLeastrushingyards', async(req, res)=>{
    try{
        const data = await Model.find().sort({"stats.rushingyards":1}).limit(1);
        res.send(data);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// Player with most number of sacks
router.get('/GetplayerwithMostSacks', async(req, res)=>{
    try{
        const data = await Model.find().sort({"stats.sacks": -1}).limit(1);
        res.send(data);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// Players with most to fewest goaqls made
router.get('/GetplayerslistwithGoalsdesc', async(req, res)=>{
    try{
        const data = await Model.find().sort({"stats.fieldgoalsmade": -1});
        res.send(data);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});



module.exports = router;