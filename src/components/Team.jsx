import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentModal.css';

function Team() {
    const [teamSize, setTeamSize] = useState(1);
    const [instanceType, setInstanceType] = useState("t2.micro");
    const [durationInHours, setDurationInHours] = useState(1);
    const navigate = useNavigate();

    // Conversion rate from USD to INR
    const conversionRate = 83;

    // Base prices per instance type (example prices, update as per AWS pricing)
    const instancePrices = {
        "t2.micro": 0.099,
        "t2.medium": 0.1464,
        "m5.large": 0.296,
    };

    const handleTeamSizeChange = (e) => {
        setTeamSize(Math.max(1, parseInt(e.target.value) || 1));
    };

    const handleInstanceTypeChange = (e) => {
        setInstanceType(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDurationInHours(Math.max(1, parseInt(e.target.value) || 1));
    };

    // Calculate total price in USD and INR
    const totalPriceUSD = teamSize * instancePrices[instanceType] * durationInHours;
    const totalPriceINR = totalPriceUSD * conversionRate;

    // Load Razorpay script
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
    
        const amountInPaisa = Math.round(totalPriceINR * 100); // Convert INR to paisa
    
        const options = {
            key: "rzp_test_GcZZFDPP0jHtC4", // Use your Razorpay test key
            amount: amountInPaisa, // Amount in paisa
            currency: "INR",
            name: "Team Pricing Payment",
            description: "Payment for Team Pricing Plan",
            handler: function (response) {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                navigate('/success'); // Redirect on successful payment
            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9876543210",
            },
            theme: {
                color: "#3399cc",
            },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
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

                <div className="mb-4">
                    <label htmlFor="instanceType" className="font-bold text-lg mb-2 block text-black">Select Instance Type:</label>
                    <select
                        id="instanceType"
                        value={instanceType}
                        onChange={handleInstanceTypeChange}
                        className="p-2 rounded border border-gray-300 w-full"
                    >
                        <option value="t2.micro">t2.micro - $0.099/hour</option>
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
        </section>
    );
}

export default Team;
