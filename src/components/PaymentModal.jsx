import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentModal({ isOpen, onClose }) {
    const [showQRCode, setShowQRCode] = useState(false);
    const [timer, setTimer] = useState(5 * 60); // Initial time in seconds (5 minutes)
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (showQRCode) {
            interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
            }, 1000);
        }

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [showQRCode]);

    useEffect(() => {
        // Redirect to success page after 20 seconds if the QR code is shown
        if (showQRCode) {
            const redirectTimer = setTimeout(() => {
                navigate('/success'); // Redirect to the success page
            }, 20000); // 20000 ms = 20 seconds

            return () => clearTimeout(redirectTimer); // Cleanup on unmount
        }
    }, [showQRCode, navigate]);

    if (!isOpen) return null;

    const handleShowQRCode = () => {
        setShowQRCode(true);
    };

    // Format timer as mm:ss
    const formatTime = (seconds) => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">CodeHub</h2>
                    <button onClick={onClose} className="close-btn">✕</button>
                </div>

                <div className="payment-section">
                    <h3>Pay With UPI QR</h3>
                    
                    {/* Show QR Code only if showQRCode is true */}
                    {showQRCode && (
                        <div className="qr-code">
                            <img src="/PhonePe.png" alt="QR Code" />
                        </div>
                    )}

                    <p>Scan the QR using any UPI app on your phone.</p>
                    
                    {/* Show the timer in a larger, styled format */}
                    {showQRCode && (
                        <p className="qr-timer">
                            QR Code is valid for <span className="timer-countdown">{formatTime(timer)}</span> minutes
                        </p>
                    )}
                </div>

                <div className="payment-methods">
                    <h4>Preferred Payment Methods</h4>
                    <button className="method-btn">Pay using UPI</button>

                    <h4>UPI, Cards & More</h4>
                    <button className="method-btn" onClick={handleShowQRCode}>UPI / QR</button>
                    <button className="method-btn">Card</button>
                </div>
            </div>
        </div>
    );
}

export default PaymentModal;
