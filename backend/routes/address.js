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
router.get("/:addID", getAddressByID);
router.get("/user/:userID", getAllAddressByUserID);

// create
router.post("/", createAddress);

// update
router.put("/:addID", updateAddressByID);

// default
router.patch("/:addID/default", setDefaultAddress);
router.patch("/:addID/unDefault", unDefaultAddress);

// delete
router.delete("/", deleteAllAddress);
router.delete("/:addID", deleteAddressByID);
router.delete("/user/:userID", deleteAllAddressByUerID);

export default router