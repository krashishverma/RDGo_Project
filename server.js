import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import twilio from "twilio";
import cookieParser from "cookie-parser"; // Added for cookie parsing

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000", // Local React frontend
    "capacitor://localhost", // Mobile app via Capacitor
    "http://your-production-url.com", // Production URL
  ],
  credentials: true, // Allow credentials (cookies, etc.)
}));
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/rdgo";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Twilio setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Temporary OTP storage (Use a more persistent solution like Redis in production)
const otpStore = {};

// Utility function to generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// Add an expiry mechanism for OTPs
const isOtpValid = (phone) => {
  const otpData = otpStore[phone];
  if (!otpData) return false;

  const { otp, createdAt } = otpData;
  const expiryTime = 5 * 60 * 1000; // 5 minutes
  return Date.now() - createdAt <= expiryTime;
};

// Define User schema and model
const userSchema = new mongoose.Schema({
  country: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  name: { type: String },
  email: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  emergencyContact: { type: String },
});

const User = mongoose.model("User", userSchema);

// Routes

// Send OTP
app.post("/api/send-otp", async (req, res) => {
  const { country, phone } = req.body;

  if (!country || !phone) {
    return res.status(400).json({ message: "Country and phone are required." });
  }

  try {
    const otp = generateOtp();
    otpStore[phone] = { otp, createdAt: Date.now() }; // Store OTP with timestamp

    // Send OTP via Twilio
    await twilioClient.messages.create({
      body: `Your OTP for RDGo is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log(`OTP sent to ${phone}: ${otp}`);
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
});

// Verify OTP and Register User
app.post("/api/verify-otp", async (req, res) => {
  const { country, phone, otp } = req.body;

  if (!country || !phone || !otp) {
    return res.status(400).json({ message: "Country, phone, and OTP are required." });
  }

  if (otpStore[phone] && isOtpValid(phone) && otpStore[phone].otp == otp) {
    try {
      const newUser = new User({ country, phone, isVerified: true });
      await newUser.save();

      delete otpStore[phone]; // Remove OTP after successful verification

      res.cookie("phone", phone, { httpOnly: true, sameSite: "Lax" }); // Save phone in cookies
      res.status(201).json({ message: "Phone number verified and user registered successfully." });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.status(400).json({ message: "Invalid or expired OTP." });
  }
});

// Fetch Profile
app.get("/api/profile", async (req, res) => {
  const phone = req.cookies.phone; // Retrieve phone from cookies

  if (!phone) {
    return res.status(400).json({ message: "Phone number is missing from cookies." });
  }

  try {
    const userProfile = await User.findOne({ phone });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Update Profile
// Update Profile
app.post("/api/profile", async (req, res) => {
  const phone = req.cookies.phone; // Retrieve phone from cookies
  const { name, email, gender, dateOfBirth, emergencyContact } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is missing from cookies." });
  }

  try {
    // Fetch the user from the database
    const userProfile = await User.findOne({ phone });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Update only provided fields
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (gender !== undefined) updates.gender = gender;
    if (dateOfBirth !== undefined) {
      // Validate date format
      const date = new Date(dateOfBirth);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ message: "Invalid date format for dateOfBirth." });
      }
      updates.dateOfBirth = date;
    }
    if (emergencyContact !== undefined) updates.emergencyContact = emergencyContact;

    // Apply updates
    Object.assign(userProfile, updates);
    await userProfile.save();

    console.log(`Profile updated for ${phone}:`, updates);
    return res.status(200).json({ message: "Profile updated successfully.", profile: userProfile });
  } catch (error) {
    console.error("Error updating profile:", error);

    // Enhanced error response
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error: Check your input values.", error });
    }

    return res.status(500).json({ message: "An error occurred while saving the profile. Please try again later." });
  }
});


// Default route
app.get("/", (req, res) => {
  res.send("RDGo Backend API is running.");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
