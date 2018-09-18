var friends = require("../data/friends");
var path = require("path");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        let smallest = 10000000,
            bestFriend;

        for (var i = 0; i < friends.length; i++) {
            let compArray = [];

            for (var j = 0; j < friends[i].scores.length; j++) {
                compArray.push(Math.abs(friends[i].scores[j] - req.body.scores[j]));
            }
            var matchScore = compArray.reduce((a, b) => a + b, 0);

            if (matchScore < smallest) {
                smallest = matchScore;
                bestFriend = friends[i];
            }
        }

        res.json(bestFriend);
        friends.push(req.body);
    });

}