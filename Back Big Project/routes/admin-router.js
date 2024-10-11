const {
    ADMIN_ENDPOINT,
    ADMIN_ADD,
    POST_ENDPOINT,
    DELETE_ENDPOINT,
    EDIT_SHOW_ENDPOINT,
    EDIT_ENDPOINT,
    API_USER_ENDPOINT
} = require('../utils/urlHelper')

const adminController = require("../controllers/adminController");
const Router = require("./router");
const router = new Router();

router.addRouter(ADMIN_ENDPOINT,adminController.getAdmin);
router.addRouter(ADMIN_ADD,adminController.postAdmin);
router.addRouter(POST_ENDPOINT,adminController.getPost);
router.addRouter(DELETE_ENDPOINT,adminController.deleteAdmin,true);
router.addRouter(EDIT_SHOW_ENDPOINT,adminController.getEdit,true);
router.addRouter(EDIT_ENDPOINT,adminController.editAdmin,true);
router.addRouter(API_USER_ENDPOINT,adminController.dataToFront);




module.exports = router.handleRoute.bind(router);
