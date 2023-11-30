import express from "express";
const router = express.Router();
import checkUser from "../middleware/checkUser.js";
import checkAdmin from "../middleware/checkAdmin.js";

import user_login_post from "./routehandler/userLogin.js";
import admin_login_post from "./routehandler/adminLogin.js";
import admin_signup_post from "./routehandler/adminSignup.js";

import post_ad from "./routehandler/postAd.js";
import get_data from "./routehandler/getData.js";

import website_data from "./routehandler/websiteData.js";
import single_post from "./routehandler/singlePost.js";

import post_update from "./routehandler/postUpdate.js";
import post_delete from "./routehandler/postDelete.js";
import post_renew from "./routehandler/renewPost.js";


////login and signup
router.post("/user/login", user_login_post);
router.post("/admin/login", admin_login_post);
router.post("/admin/signup", admin_signup_post);

///posting ads
router.post("/post/ad", checkUser, post_ad);

///getting data for user and admin
router.get("/get/data", checkUser, get_data);

/////getiing data fro websites

router.get("/get/data/:category/:city", website_data);
router.get("/get/single/post/:id", single_post);

/////updating user an post

router.post("/post/update/:post_id", checkUser, post_update);
router.delete("/post/delete/:post_id", checkUser, post_delete);
router.post("/post/renew/:post_id", checkUser, post_renew);


export default router;
