let hikeID = localStorage.getItem("hikeID");

db.collection("hikes").where("code", "==", hikeID)
            .get()
            .then(queryHike => {
                //see how many results you have got from the query
                size = queryHike.size;
                // get the documents of query
                Hikes = queryHike.docs;

                // We want to have one document per hike, so if the the result of 
                //the query is more than one, we can check it right now and clean the DB if needed.
                if (size = 1) {
                    var thisHike = Hikes[0].data();
                    name = thisHike.name;
                    document.getElementById("HikeName").innerHTML = name;
                } else {
                    console.log("Query has more than one data")
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

function writeReview() {
    let Title = document.getElementById("title").value;
    let Level = document.getElementById("level").value;
    let Season = document.getElementById("season").value;
    let Description = document.getElementById("description").value;

    let Flooded = document.querySelector('input[name="flooded"]:checked').value;
    let Scrambled = document.querySelector('input[name="scrambled"]:checked').value;
}

function writeReview() {
    console.log("in")
    let Title = document.getElementById("title").value;
    let Level = document.getElementById("level").value;
    let Season = document.getElementById("season").value;
    let Description = document.getElementById("description").value;
    let Flooded = document.querySelector('input[name="flooded"]:checked').value;
    let Scrambled = document.querySelector('input[name="scrambled"]:checked').value;
    console.log(Title, Level, Season, Description, Flooded, Scrambled);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("reviews").add({
                        code: hikeID,
                        userID: userID,
                        title: Title,
                        level: Level,
                        season: Season,
                        description: Description,
                        flooded: Flooded,
                        scrambled: Scrambled,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(()=>{
                        window.location.href = "thanks.html"; //new line added
                    })
                })
                   
        } else {
            // No user is signed in.
        }
    });

}