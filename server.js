const { urlencoded } = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
// htmlRoutes with catch all * must be loaded last to prevent unwanted reroutes
app.use("/", htmlRoutes);

app.listen(PORT, () => console.log(`Serving running at http://localhost:${PORT}`));
