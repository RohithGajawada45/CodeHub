import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './PaymentModal.css';

function Team() {
    const [teamSize, setTeamSize] = useState(1);
    const [instanceType, setInstanceType] = useState("t2.micro");
    const [durationInHours, setDurationInHours] = useState(1);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const navigate = useNavigate();

    // Conversion rate from USD to INR
    const conversionRate = 83; // Example rate, update to the latest

    // Base prices per instance type (example prices, update as per AWS pricing)
    const instancePrices = {
        "t2.micro": 0.099, // per hour
        "t2.medium": 0.1464,
        "m5.large": 0.296,
    };

    const handleTeamSizeChange = (e) => {
        const size = Math.max(1, parseInt(e.target.value) || 1);
        setTeamSize(size);
    };

    const handleInstanceTypeChange = (e) => {
        setInstanceType(e.target.value);
    };

    const handleDurationChange = (e) => {
        const duration = Math.max(1, parseInt(e.target.value) || 1);
        setDurationInHours(duration);
    };

    const handlePayment = () => {
        setIsPaymentModalOpen(true);
    };

    const closeModal = () => {
        setIsPaymentModalOpen(false);
        navigate('/success'); // Example redirection after payment
    };

    // Calculate total price in USD
    const totalPriceUSD = teamSize * instancePrices[instanceType] * durationInHours;
    // Convert total price to INR
    const totalPriceINR = totalPriceUSD * conversionRate;

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

                <div className="mb-4">
                    <label htmlFor="instanceType" className="font-bold text-lg mb-2 block text-black">Select Instance Type:</label>
                    <select
                        id="instanceType"
                        value={instanceType}
                        onChange={handleInstanceTypeChange}
                        className="p-2 rounded border border-gray-300 w-full"
                    >
                        <option value="t2.micro">t2.micro - $0.09/hour</option>
                        <option value="t2.medium">t2.medium - $0.1464/hour</option>
                        <option value="m5.large">m5.large - $0.296/hour</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="duration" className="font-bold text-lg mb-2 block text-black">Enter Duration (hours):</label>
                    <input
                        type="number"
                        id="duration"
                        value={durationInHours}
                        onChange={handleDurationChange}
                        min="1"
                        className="p-2 rounded border border-gray-300 w-1/4"
                    />
                </div>

                <div className="my-6 text-lg text-black-300">
                    <p><strong>Price per Member (USD):</strong> <span className="text-green-400">${(instancePrices[instanceType] * durationInHours).toFixed(2)}</span></p>
                    <p><strong>Total Price (USD):</strong> <span className="text-red-400">${totalPriceUSD.toFixed(2)}</span></p>
                    <p><strong>Total Price (INR):</strong> <span className="text-red-400">₹{totalPriceINR.toFixed(2)}</span></p>
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
