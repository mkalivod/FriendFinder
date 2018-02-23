var path = require('path');
//requires the data from the friends.js file that includes the friends variable
var friendsData = require('../data/friends.js');

/*=============================================COMPARISON VARIABLES=========================================*/
//user scores are passed into this array to be compared to friends
var userArray = []
/*the number compared to the difference set to a high number so it will always be replaced 
by the first friend comparison*/
var comparisonNum = 500;

//variable set to hold the best friend object from teh friendsData array to be returned
var bestFriend;
//variable to hold the current difference betwen the user/friend scores
var difference = 0;
//current friend number being compared from the friendsData array
var friendNum = 0
/*sets the required data from friends.js to the variable friends so it can be 
called in app.get*/


//exporting from survey.js the express app function
module.exports = function(app){
	//displays the variable friends data (from the friends.js file) in JSON format
	app.get('/api/friends', function(req, res){
		res.json(friendsData);
	});

	/*create a POST route to take in the users data, compare it to friends, and return the best friend*/
	app.post("/api/friends", function(req, res){
		/*turns string of numbers into integers and pushes it in the userArray to be compared with friends*/
		for(var i = 0; i <req.body.scores.length; i++){
			userArray.push(parseInt(req.body.scores[i]))
		}

		
/*==================================================FUNCTIONS==================================================*/

		function finalFriend(){
			res.send(bestFriend);
			reset();
		}
		
		/*function to compare the current friend vs the user data then pass that into the bestScore()*/
		function compareScores(){
			
			if(friendNum == friendsData.length ){
				finalFriend();
			}
			else{
			difference = 0;
				for(var i = 0; i < userArray.length; i++){
					difference += Math.abs(friendsData[friendNum].scores[i] - userArray[i]);
				}
				bestScore(difference, friendNum);
			}
		}

		/*function to compare how the current friend/user comparison compares to the rest*/
		function bestScore(difference, friendfriendNum) {
			//increment friendNum by 1 to compare next friend to user
			friendNum +=1;
			/*if the difference is less than the comparison number that friend becomes the new bestFriend
			then compareScores() is called to compare the next user*/
			if (difference < comparisonNum){
				bestFriend = friendsData[friendfriendNum]
				comparisonNum = difference;
				compareScores();	
			} else {
				compareScores();
			}
		}
		
		/*pushes the users information to the friendsData array.  It also resets all of the variables for the next
		user*/
		function reset(){
			friendsData.push(req.body);
			difference = 0;
			friendNum = 0;
			comparisonNum = 500;
			bestFriend;
			userArray = [];
		}

		/*start the comparison once a user submits their information in survey.html*/
		compareScores();

	}); //app.post end

} 

