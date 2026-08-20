const Client = require("../models/client");


// CREATE CLIENT

const createClient = async (req, res) => {

  try {

    const {
      clientName,
      email,
      phone,
      companyName,
      gstNumber,
      address,
    } = req.body;


    const client = await Client.create({

      clientName,
      email,
      phone,
      companyName,
      gstNumber,
      address,

      createdBy: req.user._id,

    });


    res.status(201).json({

      success: true,
      message: "Client Created Successfully",
      client,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getAllClients = async (req, res) => {

  try {

    const clients = await Client.find({
      createdBy: req.user._id,
    });

    res.status(200).json({

      success: true,
      totalClients: clients.length,
      clients,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// GET SINGLE CLIENT

const getSingleClient = async (req, res) => {

  try {

    const client = await Client.findOne({

      _id: req.params.id,
      createdBy: req.user._id,

    });


    if (!client) {

      return res.status(404).json({
        message: "Client Not Found",
      });

    }


    res.status(200).json({

      success: true,
      client,

    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// UPDATE CLIENT

const updateClient = async (req, res) => {

  try {

    const client = await Client.findOne({

      _id: req.params.id,
      createdBy: req.user._id,

    });


    if (!client) {

      return res.status(404).json({
        message: "Client Not Found",
      });

    }


    const updatedClient = await Client.findByIdAndUpdate(

      req.params.id,
      req.body,

      {
        new: true,
      }

    );


    res.status(200).json({

      success: true,
      message: "Client Updated Successfully",
      updatedClient,

    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// DELETE CLIENT

const deleteClient = async (req, res) => {

  try {

    const client = await Client.findOne({

      _id: req.params.id,
      createdBy: req.user._id,

    });


    if (!client) {

      return res.status(404).json({
        message: "Client Not Found",
      });

    }


    await client.deleteOne();


    res.status(200).json({

      success: true,
      message: "Client Deleted Successfully",

    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



module.exports = {

  createClient,
  getAllClients,
  getSingleClient,
  updateClient,
  deleteClient,

};