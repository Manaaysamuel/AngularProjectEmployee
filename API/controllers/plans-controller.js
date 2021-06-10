const router = require("express").Router();
const asyncWrapper = require("../utilities/async-wrapper").AsyncWrapper;

router.get("/", asyncWrapper(async (req, res) => {

}));

router.get("/:id", (req, res)=> {

});

router.post("/", (req, res)=> {

});

router.delete("/:id", (req, res)=> {

});
module.exports = router;