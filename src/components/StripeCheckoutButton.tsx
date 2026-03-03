import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface StripeCheckoutButtonProps {
  productId: string;
  productName: string;
  price: number; // en centimes
  currency?: string;
  variant?: 'primary' | 'secondary';
}

export default function StripeCheckoutButton({
  productId,
  productName,
  price,
  currency = 'eur',
  variant = 'primary',
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const stripe = await loadStripe(
        import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Appel à votre API backend pour créer une session Stripe
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          productName,
          price,
          currency,
        }),
      });

      const { sessionId } = await response.json();

      // Redirection vers Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe error:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  }[variant];

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`${buttonClasses} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Chargement...' : `Acheter - ${(price / 100).toFixed(2)}€`}
    </button>
  );
}
