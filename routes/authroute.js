import express from 'express';
const router = express.Router();
import checkUser from '../middleware/checkUser.js';
import checkAdmin from '../middleware/checkAdmin.js';

import user_login_post from './routehandler/userLogin.js';
import admin_login_post from './routehandler/adminLogin.js';
import admin_signup_post from './routehandler/adminSignup.js';

import post_ad from './routehandler/postAd.js';
import get_data from './routehandler/getData.js';

import website_data from './routehandler/websiteData.js';
import single_post from './routehandler/singlePost.js';

import post_update from './routehandler/postUpdate.js';
import post_delete from './routehandler/postDelete.js';
import post_renew from './routehandler/renewPost.js';
import add_payment from './routehandler/addPayment.js';
import get_credit from './routehandler/getCredit.js';

import Post from '../database/models/Post.js';

////login and signup
router.post('/user/login', user_login_post);
router.post('/admin/login', admin_login_post);
router.post('/admin/signup', admin_signup_post);

///posting ads
router.post('/post/ad', checkUser, post_ad);

///getting data for user and admin
router.get('/get/data', checkUser, get_data);

/////getiing data fro websites

router.get('/get/data/:category/:city', website_data);
router.get('/get/single/post/:id', single_post);

/////updating user an post

router.post('/post/update/:post_id', checkUser, post_update);
router.delete('/post/delete/:post_id', checkUser, post_delete);
router.post('/post/renew/:post_id', checkUser, post_renew);

/// payment add

router.post('/admin/payment/:user_id', checkUser, add_payment);

/// payment add

router.get('/get/user/updated/credit', checkUser, get_credit);

router.post('/create-payment-intend', async (req, res) => {
  try {
    const data = {
      price_amount: req.body.price_amount,
      price_currency: 'usd',
      pay_currency: 'btc',
      ipn_callback_url: 'https://nowpayments.io',
      order_id: '45698564854-56gvdsdt-53456',
      order_description: 'Buy credit for premium post',
    };

    const config = {
      headers: {
        'x-api-key': `${process.env.key}`,
        'Content-Type': 'application/json',
      },
    };

    const createdIntend = await axios.post(
      `${process.env.API_URL}/payment`,
      data,
      config
    );

    res.status(200).json({
      msg: 'data received',
      intend: createdIntend.data,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'something went wrong',
    });
  }
});

router.post('/check-payment-status', async (req, res) => {
  try {
    const data = req.body;
    console.log(data.payment_id);

    const config = {
      headers: {
        'x-api-key': `${process.env.key}`,
      },
    };

    const paymentStatus = await axios.get(
      `${process.env.API_URL}/payment/${data.payment_id}`,
      config
    );

    res.status(200).json({
      msg: 'resolved successfully',
      data: paymentStatus.data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'something went wrong',
    });
  }
});

export default router;

// const createPayment = {
//     payment_id: '4810827668',
//     payment_status: 'waiting',
//     pay_address: '3431zrtxVaimf1ekrWUxqTo83Vfp3ndgh6',
//     price_amount: 3999.5,
//     price_currency: 'usd',
//     pay_amount: 0.07703049,
//     amount_received: 0.076588,
//     pay_currency: 'btc',
//     order_id: 'RGDBP-21314',
//     order_description: 'Apple Macbook Pro 2019 x 1',
//     payin_extra_id: null,
//     ipn_callback_url: 'https://nowpayments.io',
//     created_at: '2024-02-15T06:10:51.096Z',
//     updated_at: '2024-02-15T06:10:51.096Z',
//     purchase_id: '6141668730',
//     smart_contract: null,
//     network: 'btc',
//     network_precision: null,
//     time_limit: null,
//     burning_percent: null,
//     expiration_estimate_date: '2024-02-15T06:30:51.096Z',
//     is_fixed_rate: false,
//     is_fee_paid_by_user: false,
//     valid_until: '2024-02-22T06:10:51.096Z',
//     type: 'crypto2crypto',
//   };
