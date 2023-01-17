const router = require("express-promise-router")();
const userController = require("../controllers/user");

router.get("/", userController.index);
router.post("/", userController.newUser);
router.get("/:id", userController.getUser);
router.put("/:id", userController.replaceUser);
router.delete("/:id", userController.deleteUser);

router.get("/:id/cars", userController.getUserCars);
router.post("/:id/cars", userController.newUserCar);
module.exports = router;
