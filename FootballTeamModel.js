var mongoose = require('mongoose');

var FootballSchema = mongoose.Schema({
    name:{
        type: String
    },
    position:{
        type:String
    },
    team:{
        type:String
    },
    stats:{
        rushingyards:{
            type: Number
        },
        touchdownsthrown:{
            type:Number
        },
        sacks:{
            type:Number
        },
        fieldgoalsmade:{
            type:Number
        },
        fieldgoalsmissed:{
            type:Number
        },
        catches:{
            type:Number
        }
    }
})

 module.exports = mongoose.model("FootballTeam", FootballSchema, 'FootballTeam');

