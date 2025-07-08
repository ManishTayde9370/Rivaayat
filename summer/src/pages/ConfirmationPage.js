import React from 'react';

function ConfirmationPage() {
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));

  return (
    <div className="container py-5 text-center">
      <h2>🎉 Thank You for Your Order!</h2>
      <p>We've received your order and will ship it to:</p>

      <div className="mt-3">
        <strong>{shippingInfo?.name}</strong><br />
        {shippingInfo?.address}, {shippingInfo?.city}<br />
        📞 {shippingInfo?.phone}
      </div>

      <p className="mt-4">We’ll contact you with tracking info soon.</p>
    </div>
  );
}

export default ConfirmationPage;
