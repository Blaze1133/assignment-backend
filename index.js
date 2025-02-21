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

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input" });
    }

    // Extract user details
    const USER_DETAILS = {
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
    };

    // Filter numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item)).map(String);
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

    // Find the highest alphabet (case insensitive, but return as given in input)
    const highestAlphabet =
      alphabets.length > 0
        ? [
            alphabets.reduce((max, curr) =>
              curr.toLowerCase() > max.toLowerCase() ? curr : max
            ),
          ]
        : [];

    // Construct and send response
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
