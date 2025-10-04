const express = require("express");
const authRoutes = require("./auth.routes.js");
const eventsRoutes = require("./events.routes.js");
const organizerRoutes = require("./organizers.routes.js");
const analyticsRoutes = require("./analytics.routes.js");
const CFARoutes = require("./CFARoutes.js")
const router = express.Router();

router.use("/sparkMotion-auth", authRoutes);
router.use("/sparkMotion-events", eventsRoutes);
router.use("/sparkMotion-organizer", organizerRoutes);
router.use("/sparkMotion-analytics", analyticsRoutes);
router.use("/CFA", CFARoutes);


module.exports = router;
