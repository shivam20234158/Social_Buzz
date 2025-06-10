import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommendedUsers, getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOutgoingFriendReqs} from '../controllers/user.controller.js';  

const router = express.Router();

router.use(protectRoute); // Apply the protectRoute middleware to all routes in this router

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-request",getFriendRequests);
router.get("/outgoing-friend-request/:id",getOutgoingFriendReqs); // Get friend requests for a specific user

export default router;