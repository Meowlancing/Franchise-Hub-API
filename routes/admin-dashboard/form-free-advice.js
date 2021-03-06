const express = require('express');
const router = express.Router();

// init. schemas
const fregn = require('../../schemas/franchisor-registration');
const news = require('../../schemas/newsletter-subscribers');
const admcred = require('../../schemas/admin-login-cred');
const tvid = require('../../schemas/trending-videos');
const fadv = require('../../schemas/free-advice');
const events = require('../../schemas/events');

// init. middlewares
router.use(express.json());

router.get('/all/:page', async (req, res) => {
        try {
                const payload = await fadv.find({ })
                        .sort({ "createdAt": -1 })
                        .limit(req.query.quantity || 10)      // quantity is the objects returned per page
                        .skip((req.query.quantity || 10) * (req.params.page - 1));

                return res.json({
                        success: true,
                        payload: payload
                });
        } catch (e) {
                res.status(500).json({
                        success: false,
                        message: "Internal server error: " + e
                });
        }
});

router.get('/read/:page', async (req, res) => {
        try {
                const payload = await fadv.find(
                        {
                                "metadata.is_read": true
                        })
                        .sort({ "createdAt": -1 })
                        .limit(req.query.quantity || 10)      // quantity is the objects returned per page
                        .skip((req.query.quantity || 10) * (req.params.page - 1));

                return res.json({
                        success: true,
                        payload: payload
                });
        } catch (e) {
                res.status(500).json({
                        success: false,
                        message: "Internal server error: " + e
                });
        }
});

router.get('/unread/:page', async (req, res) => {
        try {
                const payload = await fadv.find(
                        {
                                "metadata.is_read": false
                        })
                        .sort({ "createdAt": -1 })
                        .limit(req.query.quantity || 10)      // quantity is the objects returned per page
                        .skip((req.query.quantity || 10) * (req.params.page - 1));

                return res.json({
                        success: true,
                        payload: payload
                });
        } catch (e) {
                res.status(500).json({
                        success: false,
                        message: "Internal server error: " + e
                });
        }
});

router.put('/mark-read/:objectId', async (req, res) => {
        try {
                await fadv.findByIdAndUpdate(req.params.objectId, { "metadata.is_read": true });

                return res.json({
                        success: true,
                        message: "Object has been marked read"
                });
        } catch (e) {
                res.status(500).json({
                        success: false,
                        message: "Internal server error: " + e
                });
        }
});

router.put('/mark-unread/:objectId', async (req, res) => {
        try {
                await fadv.findByIdAndUpdate(req.params.objectId, { "metadata.is_read": false });

                return res.json({
                        success: true,
                        message: "Object has been marked read"
                });
        } catch (e) {
                res.status(500).json({
                        success: false,
                        message: "Internal server error: " + e
                });
        }
});

router.delete('/:objectId', async (req, res) => {
        try {
                await fadv.findByIdAndRemove(req.params.objectId);

                return res.json({
                        success: true,
                        message: "Object has been deleted successfully"
                });
        } catch (e) {
                res.status(500).json({
                        success: false,
                        message: "Internal server error: " + e
                });
        }
});

module.exports = router;