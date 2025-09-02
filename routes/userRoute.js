import express from "express";
import {createUser,getUser} from "../controller/userController.js";
const router = express.Router();
router.route("/").post(createUser);
router.route("/").get(getUser);
export default router;