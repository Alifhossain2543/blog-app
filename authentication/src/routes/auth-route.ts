import {  Router } from "express"
import {
  createAccount,
  login,
  userTestRoute,
  updateBasicInfo,
  userLogout,
} from "../controllers/auth-controller"
import { CREATE_ACCOUNT, LOGIN } from "../validation/auth-validation"
// import {validateRequest} from '../errors/validationError'
import {validateRequest, authUser} from '@hrioymahmud/blogcommon'
// import { authUser } from '../middlewares/auth-user';

//

const router = Router()
router.get("/test", authUser, userTestRoute)
router.get("/logout", userLogout)
router.post("/create-user", CREATE_ACCOUNT, validateRequest, createAccount)
router.post("/login", LOGIN, validateRequest, login)
router.patch("/update/:id", authUser,  updateBasicInfo)


export { router as AuthRouter}
