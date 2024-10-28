import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './PaymentModal.css';

function Team() {
    const [teamSize, setTeamSize] = useState(1);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const basePricePerMember = 10;
    const navigate = useNavigate();

    const handleTeamSizeChange = (e) => {
        const size = Math.max(1, parseInt(e.target.value) || 1);
        setTeamSize(size);
    };

    const handlePayment = () => {
        setIsPaymentModalOpen(true);
    };

    const closeModal = () => {
        setIsPaymentModalOpen(false);
        // Redirect or any further actions after payment
        navigate('/success'); // Example redirection after payment
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-primary w-full p-8">
            <h2 className="text-secondary font-semibold text-4xl mb-6 text-center">Team Pricing Calculator</h2>

            <div className="bg-[#ffffff] p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="mb-4">
                    <label htmlFor="teamSize" className="font-bold text-lg mb-2 block text-black">Enter Team Size:</label>
                    <input
                        type="number"
                        id="teamSize"
                        value={teamSize}
                        onChange={handleTeamSizeChange}
                        min="1"
                        className="p-2 rounded border border-gray-300 w-1/4"
                    />
                </div>

                <div className="my-6 text-lg text-black-300">
                    <p><strong>Price per Member:</strong> <span className="text-green-400">${basePricePerMember}</span></p>
                    <p><strong>Total Price:</strong> <span className="text-red-400">${teamSize * basePricePerMember}</span></p>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Pay Now
                </button>
            </div>

            {/* Payment Modal */}
            <PaymentModal isOpen={isPaymentModalOpen} onClose={closeModal} />
        </section>
    );
}

export default Team;
