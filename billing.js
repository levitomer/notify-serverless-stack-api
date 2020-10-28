import stripePackage from 'stripe';
import handler from './libs/handler-lib';
import {calculateCost } from './libs/billing-lib';

// Handles user billing for a given amount of notes
export const main = handler(async (event, context) => {
    const {storage, source} = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const stripe = stripePackage(process.env.stripeSecretKey);

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd"
    });

    return { status: true };
})