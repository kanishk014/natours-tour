import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourID) => {
  const stripe = Stripe(
    'pk_test_51J4Kz8SHGufhIZqgIWmxgdrE20A6C7svKlBCUFc4ojVdtQ9YuaUOhgpH7y3Jvtyw8Iv2f8Rbn3y6PBKZBn60EatG00Wk9mBTUk'
  );

  try {
    // 1. Get the checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourID}`);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
