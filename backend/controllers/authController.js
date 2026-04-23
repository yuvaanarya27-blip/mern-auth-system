const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// Generate 6 digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: 'yuvaanarya27@gmail.com',
    to: email,
    subject: 'Email Verification OTP',
    html: `<h2>Your OTP is: <b>${otp}</b></h2>
           <p>This OTP expires in 10 minutes.</p>`
  });
};

// REGISTER
const register = async (req, res) => {
  try {
    console.log("EMAIL:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS);

    const { name, email, password, mobile, gender, state, pincode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = await User.create({
      name, email,
      password: hashedPassword,
      mobile, gender, state, pincode,
      otp, otpExpiry,
      isVerified: false
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.status(201).json({ message: 'Registration successful! Please verify your email.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired' });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully! You can now login.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email first' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        state: user.state,
        pincode: user.pincode,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ message: 'OTP sent to your email for password reset' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful! You can now login.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, verifyOTP, login, forgotPassword, resetPassword };