
import express from "express"
import {userRoutes,adminRoutes} from "./v1/routes/index"

const router = express();

router.use("/user", userRoutes);
router.use('/admin', adminRoutes);

export = router