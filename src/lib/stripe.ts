import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51RalU6PGvayfO5nzAo2pyU6MXB0xPiOHglV4sVci720PdDZAMIK7v0RJZGokY8MgTYN7m6udFgr8QTTUkhtHOoNF00SfpShic9', {
  apiVersion: '2023-10-16', // Use the latest API version
});

// Add error handling
stripePromise.catch((error) => {
  console.error('Error initializing Stripe:', error);
});

export default stripePromise; 