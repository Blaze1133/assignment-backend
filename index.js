const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample user details
const USER_DETAILS = {
  user_id: "john_doe_17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123",
};

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));
    const highestAlphabet =
      alphabets.length > 0 ? [alphabets.sort().pop()] : [];

    res.json({
      is_success: true,
      ...USER_DETAILS,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
