import { loadStripe } from '@stripe/stripe-js';

// Test the Stripe initialization
const testStripe = async () => {
  try {
    const stripe = await loadStripe('pk_test_51RalU6PGvayfO5nzAo2pyU6MXB0xPiOHglV4sVci720PdDZAMIK7v0RJZGokY8MgTYN7m6udFgr8QTTUkhtHOoNF00SfpShic9');
    console.log('Stripe initialized successfully:', stripe);
    return stripe;
  } catch (error) {
    console.error('Error initializing Stripe:', error);
    throw error;
  }
};

export default testStripe; 