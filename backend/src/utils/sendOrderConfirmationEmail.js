const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (userEmail, order) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const productList = order.products.map(
    (p) => `<li>${p.product.name} × ${p.quantity} = ₹${(p.price * p.quantity).toLocaleString('en-IN')}</li>`
  ).join('');

  const mailOptions = {
    from: `"Shop" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: '🛒 Order Confirmation',
    html: `
      <h2>Thank you for your order!</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total:</strong> ₹${order.totalAmount.toLocaleString('en-IN')}</p>
      <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDelivery).toDateString()}</p>
      <p><strong>Shipping Address:</strong><br>
      ${order.shippingAddress.fullName}<br>
      ${order.shippingAddress.address}, ${order.shippingAddress.city}<br>
      ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
      <h4>Items:</h4>
      <ul>${productList}</ul>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOrderConfirmationEmail;
