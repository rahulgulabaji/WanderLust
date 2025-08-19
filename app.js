const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

const path = require("path" );
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/",async(req,res)=>{
    res.send("Its Root Page");
});

// Index Route
app.get("/listings", async(req,res)=>{
    let allListing =  await Listing.find({})
        res.render("./listings/index.ejs", {allListing});
    })

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
    
})

app.put("/listings/:id", async (req,res)=> {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

// Create route
app.post("/listings", async (req,res)=>{
    const newlisting = new Listing(req.body.listing)
    await newlisting.save();
    res.redirect("/listings");
})

// Update Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing})
})

// Delete Route
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
})

// Show Route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing});
});




app.listen(8080,()=>{
    console.log("Server started at the port: 8080 ");
});