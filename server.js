const { urlencoded } = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
// this route is used for communication between front and back end
app.use("/api", apiRoutes);
// this route used to handle http requests from client
// htmlRoutes has catch all * and must be loaded last to prevent unwanted reroutes
app.use("/", htmlRoutes);
// start the server listening for http requests on PORT
// the logged URL to the test server allows for easier development process
app.listen(PORT, () => console.log(`Dev server running at http://localhost:${PORT}`));
