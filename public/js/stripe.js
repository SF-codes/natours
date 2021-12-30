/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51KBmiyDLKzLnUBqatiGv4ksU6T6Q7MDzByUlk7r6lYET0Pdp6hd3mTxukhuJFe0wmafqwWLnFxki2bVMhJOWWtRB008VpX9uoS'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from endpoint API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
