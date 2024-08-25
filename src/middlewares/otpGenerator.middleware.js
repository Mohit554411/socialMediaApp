export function generateSixDigitOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); // Converts the OTP to a string if needed
}