import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useDispatch } from 'react-redux';
import { saveOrder } from '../redux/orderSlice';

function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    const orderData = location.state?.order;
    if (!orderData) {
      navigate('/');
      return;
    }

    setOrder(orderData);
    dispatch(saveOrder(orderData));
  }, [location.state, navigate, dispatch]);

  const downloadInvoice = () => {
    const input = invoiceRef.current;
    if (!input || !order || !order._id) return;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice_${order._id}.pdf`);
    });
  };

  if (!order) return null;

  const estimatedStart = new Date();
  const estimatedEnd = new Date();
  estimatedStart.setDate(estimatedStart.getDate() + 5);
  estimatedEnd.setDate(estimatedEnd.getDate() + 7);

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : new Date().toLocaleDateString();

  return (
    <div className="container py-5">
      <div className="alert alert-success text-center mb-4">
        <h3>🎉 Your order has been placed successfully!</h3>
        <p>Thank you for shopping with us.</p>
      </div>

      <div className="text-end mb-3">
        <button className="btn btn-outline-primary" onClick={downloadInvoice}>
          📥 Download Invoice
        </button>
      </div>

      <div ref={invoiceRef} className="card shadow p-4">
        <h4 className="mb-4">🧾 Invoice</h4>

        <p><strong>Order ID:</strong> {order._id || 'N/A'}</p>
        <p><strong>Order Date:</strong> {formattedDate}</p>
        <p><strong>Estimated Delivery:</strong> {`${estimatedStart.toDateString()} - ${estimatedEnd.toDateString()}`}</p>
        {order.user?.email && <p><strong>Email:</strong> {order.user.email}</p>}

        <div className="mb-3">
          <strong>Shipping Address:</strong>
          <div>{order.shippingAddress?.fullName || 'N/A'}</div>
          <div>{order.shippingAddress?.address || 'N/A'}</div>
          <div>
            {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
          </div>
          <div>Phone: {order.shippingAddress?.phone || 'N/A'}</div>
        </div>

        <div>
          <strong>Products:</strong>
          <ul className="list-group mb-3">
            {order.products?.length ? (
              order.products.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between">
                  <span>
                    {item.product?.name || 'Unnamed Product'} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))
            ) : (
              <li className="list-group-item">No products found</li>
            )}
          </ul>
        </div>

        <div className="mt-4 d-flex justify-content-end">
          <h5><strong>Total Amount: ₹{order.totalAmount || 0}</strong></h5>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
