const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(express.json());


//////////DBMS setup/////////////////////////////////////////////////

const uri = "mongodb+srv://abhisekkumar:passcode23@internproject-zscmu.mongodb.net/Airbus?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const { detailsSchema } = require('./schema/details');
const details = mongoose.model("details", detailsSchema);

const { improvementSchema } = require('./schema/improvement');
const improvement = mongoose.model("improvement", improvementSchema);

//////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
    res.send("Details API");
});

////////////////////////////////////////////////////////////////
//Application Navigation (searchable tool tip)
//Complete display

app.get("/details", (req, res) => {
    details.find({}, (err, pr) => {
        if (err) {
            res.status(500).json({ error: err })

        } else {
            res.status(200).json({ data: pr });
        }
    });

    // let pr = { "topic": "hi", "description": "description" };
    // res.status(200).json({ data: pr });

});

//find an element

app.post("/find/", (req, res) => {

    let topic = req.body.topic.toUpperCase();

    details.find({ topic: topic }, (err, pr) => {
        if (err) {
            res.status(500).json({ error: "error occured" })
            console.log(err);
        } else {
            res.status(200).json({ data: pr });
        }
    });
    // console.log(topic);
    // res.send(topic);
});


app.get("/find/", (req, res) => {

    let topic = req.body.topic.toUpperCase();

    details.find({ topic: topic }, (err, pr) => {
        if (err) {
            res.status(500).json({ error: "error occured" })
            console.log(err);
        } else {
            res.status(200).json({ data: pr });
        }
    });

    // console.log(topic);
    // res.send(topic);
});
//Creating an element

app.post("/details", (req, res) => {
    const body = (req.body);
    // console.log(body);

    let topic = body["topic"].toUpperCase();
    // let image = body["imageUrl"];
    let description = body["description"];
    // image: image
    let pr = { topic: topic, description: description };

    details.create(pr, (err, newly) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "error occured" });
            } else {
                res.status(200).json({ data: newly });
            }
        })
        // console.log(pr);
        // res.send("done");
});


//Updating the existing one

app.put("/details/:id/", (req, res) => {
    const body = (req.body);

    let topic = body["topic"].toUpperCase();
    let description = body["description"];

    let pr = { topic: topic, description: description };

    details.findByIdAndUpdate(req.params.id, pr, (err, found) => {
        if (err) {
            res.status(500).json({ error: "error occured" })
            console.log(err);
        } else {
            res.status(200).json({ data: found });
        }
    });
});


//deleting an existing element

app.delete("/details/:id/", (req, res) => {

    details.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({ error: "error occured" })
            console.log(err);
        } else {
            res.status(200).json({ data: "deleted" });
        }
    });
});


//////////////////////////////////////////////////////////
//Application improvement & co-creation

// Input - Title + Details

app.get("/improvement", (req, res) => {
    improvement.find({}, (err, pr) => {
        if (err) {
            res.status(500).json({ error: "error occured" })
            console.log(err);
        } else {
            res.status(200).json({ data: pr });
        }
    });

    // let pr = { "topic": "hi", "description": "description" };
    // res.status(200).json({ data: pr });

});



//Creating an element

app.post("/improvement", (req, res) => {
    const body = (req.body);

    let topic = body["topic"].toUpperCase();
    let detail = body["detail"];
    // image: image
    let pr = { topic: topic, detail: detail };

    improvement.create(pr, (err, newly) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "error occured" });
            } else {
                res.status(200).json({ data: newly });
            }
        })
        // console.log(pr);
        // res.send("done");
});


//find an element by id

app.get("/improvement/:id", (req, res) => {

    improvement.findById(req.params.id, (err, imp) => {
        if (err) {
            res.status(500).json({ error: "error occured " })
            console.log(err);
        } else {
            res.status(200).json({ data: imp });
        }
    });
});

//Updating the existing one

app.put("/improvement/:id/", (req, res) => {

    const body = (req.body);

    let topic = body["topic"].toUpperCase();
    let detail = body["detail"];

    let pr = { topic: topic, detail: detail };

    improvement.findByIdAndUpdate(req.params.id, pr, (err, found) => {
        if (err) {
            res.status(500).json({ error: "error occured" })
            console.log(err);
        } else {
            res.status(200).json({ data: found });
        }
    });
});


//deleting an existing element

app.delete("/improvement/:id/", (req, res) => {

    improvement.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).json({ error: "error occured" })
            console.log(err);
        } else {
            res.status(200).json({ data: "deleted" });
        }
    });
});



// ////////////////////////////////////////////////////////////////////
// //ALL IN ONE

app.get("*", (req, res) => {
    res.send("WRONG ROUTE IS BEING CALLED");
});


/////////////////////////////////////////////////////////////////////
//CONNECTING ROUTES

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started at ${port}`);
});