import express from "express";
import {
    createAddress,
    getAllAddress,
    getAddressByID,
    unDefaultAddress,
    setDefaultAddress,
    updateAddressByID,
    getAllAddressByUserID,
    deleteAllAddress,
    deleteAddressByID,
    deleteAllAddressByUerID,
} from "../controllers/address.controller.js";

const router = express.Router();

// get
router.get("", getAllAddress);
router.get("/detail", getAddressByID);
router.get("/user", getAllAddressByUserID);

// create
router.post("/", createAddress);

// update
router.put("/", updateAddressByID);

// default
router.patch("/default", setDefaultAddress);
router.patch("/unDefault", unDefaultAddress);

// delete
router.delete("/", deleteAllAddress);
router.delete("/one", deleteAddressByID);
router.delete("/user", deleteAllAddressByUerID);

export default router