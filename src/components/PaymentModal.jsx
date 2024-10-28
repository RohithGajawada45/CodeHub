// PaymentModal.jsx
import React from 'react';

function PaymentModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Papaya Coders</h2>
                    <button onClick={onClose} className="close-btn">✕</button>
                </div>

                <div className="payment-section">
                    <h3>Pay With UPI QR</h3>
                    <div className="qr-code">
                        {/* Replace with actual QR code image */}
                        <img src="https://via.placeholder.com/150" alt="QR Code" />
                    </div>
                    <p>Scan the QR using any UPI app on your phone.</p>
                    <p className="qr-timer">QR Code is valid for 11:54 minutes</p>
                </div>

                <div className="payment-methods">
                    <h4>Preferred Payment Methods</h4>
                    <button className="method-btn">Pay using UPI</button>

                    <h4>UPI, Cards & More</h4>
                    <button className="method-btn">UPI / QR</button>
                    <button className="method-btn">Card</button>
                    <button className="method-btn">Netbanking</button>
                </div>
            </div>
        </div>
    );
}

export default PaymentModal;
