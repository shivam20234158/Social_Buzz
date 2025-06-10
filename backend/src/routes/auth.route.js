import express from 'express';
import { login, signup,logout,onboard } from '../controllers/auth.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/signup",signup)

router.post("/login",login);

//logout route to clear the cookie i.e. updating something so we use post not get
router.post("/logout",logout);

//only if autheticated user can onboard to fill the details
router.post("/onboarding",protectRoute,onboard)

//later:forgot password routes

//check if the user is authenticated and return the user details
router.get("/me", protectRoute, (req, res) => {
    // Return the user details without password due to protectRoute middleware
    res.status(200).json({ success: true, user: req.user });
});

export default router;