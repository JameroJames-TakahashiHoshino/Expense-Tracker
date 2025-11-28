const express = require("express");
const { check } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
    "/register",
    [
        check("fullName").notEmpty().withMessage("Full name is required"),
        check("email").isEmail().withMessage("Valid email is required"),
        check("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long")
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
            .withMessage(
                "Password must include uppercase, lowercase and a number"
            ),
    ],
    registerUser
);

router.post(
    "/login",
    [
        check("email").isEmail().withMessage("Valid email is required"),
        check("password").notEmpty().withMessage("Password is required"),
    ],
    loginUser
);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;

    return res.status(200).json({ imageUrl });
});

module.exports = router;