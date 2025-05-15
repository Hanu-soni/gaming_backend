const fs = require('fs');
const gamingModel = require('../models/gaming.model');



//this api is to store the data in db.
exports.addGamingData = async (req, res) => {

    try {
        //hey, I have a json file having multiple documents . I want to store that json file in my db

        const {data}=req.body;
        // const rawData = fs.readFileSync('../data.json') // Adjust path accordingly
        // const data = JSON.parse(rawData);

        if (!data || data.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Invalid data"
            })
        }

        const storeData = await gamingModel.insertMany(data);

        return res.status(201).send({
            success: true,
            message: "Data inserted successfully",
            insertedCount: storeData.length
        });




    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
}



exports.readGamingData = async (req, res) => {
    try{


         const { groupBy } = req.query;

    let pipeline = [];

    if (groupBy === 'event') {
      pipeline = [
        { $match: { propStatus: 'open' } },
        {
          $group: {
            _id: '$event.name', // group by event name
            props: { $push: '$$ROOT' }
          }
        },
        { $sort: { _id: 1 } }
      ];
    }
        else if (groupBy === 'players') {
       pipeline = [
  { $match: { propStatus: 'open' } },
  {
    $group: {
      _id: '$players.playerId', // Group by unique playerId
      name: { $first: '$players.name' },
      teamAbbr: { $first: '$players.teamAbbr' },
      positionAbbr: { $first: '$players.positionAbbr' },
      headshot: { $first: '$players.headshot' },
      props: {
        $push: {
          propId: '$propId',
          question: '$question',
          bidStats: '$bidStats',
          choices: '$choices',
          lockTime: '$lockTime',
          event: '$event',
          gameId: '$gameId',
          marketId: '$marketId'
        }
      }
    }
  },
  { $sort: { name: 1 } }
];


    }


        const gamingData=await gamingModel.aggregate(pipeline);
        if(!gamingData){
            return res.status(400).send({
                message:"gaming data not found",
                success:false
            })
        }

        return res.status(200).send({
            success:true,
            data:gamingData
        })



    }catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }


};


exports.updateChoiceStatus = async (req, res) => {
    try{
        const {choice,playerId}=req.body;
        
        const players=await gamingModel.updateMany({'players.0.playerId':playerId},{
            $set:{
                [`choices.${choice === 'Over' ? 0 : 1}.selected`]: true
            }
        });

        if(!players){
            return res.status(400).send({
                success:false,
                message:"no players found with this id"
            })
        }
        return res.status(200).send({
            success:true,
            message:"players are updated"
        })

    }



    
    catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }


};


