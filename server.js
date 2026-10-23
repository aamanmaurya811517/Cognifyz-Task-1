const express = require("express");

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Read data submitted through HTML forms
app.use(express.urlencoded({ extended: true }));

// Serve CSS files
app.use(express.static("public"));

// Show the registration page
app.get("/", (req, res) => {
  res.render("index", {
    registered: false,
    name: "",
    email: "",
    error: "",
  });
});

// Handle registration form submission
app.post("/register", (req, res) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim();
  const terms = req.body.terms;

  // Validate the submitted form
  if (!name || !email || !terms) {
    return res.status(400).render("index", {
      registered: false,
      name: name || "",
      email: email || "",
      error: "Please fill in all fields and accept the terms.",
    });
  }

  // Render the page with the submitted user details
  res.render("index", {
    registered: true,
    name: name,
    email: email,
    error: "",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
