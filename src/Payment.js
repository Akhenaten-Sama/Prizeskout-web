import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { getConfig, createIntent } from "./api";

function Payment({ amount,user,name }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    getPaymentConfig();
  }, []);

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const getPaymentConfig = () => {
  
        getConfig(user.token).then((res) => {
          const { publishableKey_live} = res.data;
          setStripePromise(loadStripe(publishableKey_live));
        }).catch((err)=>{
          console.log(err)
        })
   
  
  };

  const createPaymentIntent = () => {
      createIntent({
        amount:amount.amount,
        token:user.token,
        desc:amount.name
       
      }).then(async (res) => {
        const myClientSecret= res.data.clientSecret;
        setClientSecret(myClientSecret);
      }).catch(err=>{
        console.log(err)
      })
  
  };

  return (
    <>
      <h4>Checkout</h4>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm user={user}clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
}

export default Payment;
