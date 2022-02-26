const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const Stripe = require("stripe")
const stripe = Stripe("sk_test_51KP7BsCBzGj4S6fDUh5U8UYFe2iGs4SD7shoA8bV0b0M1D020rYL0PKAstdatMBPBDyDtrh0oCp9t2GKTQTGZZSF00fqkOLdqP");

//REGISTER
router.post("/payment", (req, res) => {
  console.log('req.body.tokenId: ', req.body.tokenId);
  console.log('req.body.amount: ', req.body.amount);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd"
    },
    (stripeErr, stripeRes) => {
      console.log('stripeRes: ', stripeRes);
      console.log('stripeErr: ', stripeErr);
      if(stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  )
});

module.exports = router;