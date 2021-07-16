import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100; //unit in cents
    const publishableKey = 'pk_test_51JDx8KIlBjj1oPvXJP7SFJDB4rVbAqdhwwiw3wq48ciwL8RmO8ttgnKIDPFNSm7XQ7oKONIioUCJutcVHFoH0Nmh00hfMzIIz4';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Clothing Ltd.'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;