const router = require("express").Router();

router.get("/", (_, response) => {
  response.render("pages/home", {
    title: "Home",
  });
});

module.exports = router;
