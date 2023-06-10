const Stripe = require('stripe');
const stripe = Stripe('sk_test_51NFUBASHxOt6lyfOccpjSB2F2hnEtn838r3kdo51Mh1z5CGt1X0VFe07597oBrt5j3fSphHUKYgbVPMubfPeNgsv00aUyDyHWz');

exports.processPayment =async (req, res) => {

    

     const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        description: "Software development services",
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: 'accept_a_payment' },
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    })

   
}

// sent stripe api key to frontend

exports.sendStripeApiKey = (req, res) => {
    res.send({stripeApiKey:process.env.STRIPE_PUBLIC_KEY})
}




