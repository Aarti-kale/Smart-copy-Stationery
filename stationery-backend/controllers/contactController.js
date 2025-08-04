const path = require("path");
const fs = require("fs");
const Contact = require('../models/Contact');
 
const  submitContactForm = async(req,res) => {
    try {
         const {name, email, message} = req.body;
         const newContact = new Contact({name, email, message});
         await newContact.save();
         res.status(201).json({message:"message saved succesfully"});
    } catch (err) {
        console.error('Error saving message', err);
        res.status(500).json({error:'Failed to save message'});
    }
};

// get
const getAllContacts = async(req, res) => {
    try{
    const contacts = await Contact.find().sort({ createdAt : -1});
    res.status(200).json(contacts);
    }catch (err){
        console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = {
    submitContactForm,
    getAllContacts
}