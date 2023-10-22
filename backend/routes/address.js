import express from "express";
import { createAddress } from "../controllers/address.controller.js";

const router = express.Router();

router.post("/", createAddress);

export default router