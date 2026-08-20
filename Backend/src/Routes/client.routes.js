const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {

  createClient,
  getAllClients,
  getSingleClient,
  updateClient,
  deleteClient,

} = require("../controllers/client.controller");
router.use(protect);
router.post("/add-client", createClient);

router.get("/all-clients", getAllClients);

router.get("/:id", getSingleClient);

router.put("/:id", updateClient);

router.delete("/:id", deleteClient);



module.exports = router;