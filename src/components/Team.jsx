import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentModal.css';

function Team() {
    const [teamSize, setTeamSize] = useState(1);
    const [instanceType, setInstanceType] = useState("t2.micro");
    const [durationInHours, setDurationInHours] = useState(1);
    const navigate = useNavigate();

    const conversionRate = 83;

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

    const totalPriceUSD = teamSize * instancePrices[instanceType] * durationInHours;
    const totalPriceINR = totalPriceUSD * conversionRate;

    
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

        const amountInPaisa = Math.round(totalPriceINR * 100); 

        const options = {
            key: "rzp_test_GcZZFDPP0jHtC4", 
            amount: amountInPaisa, 
            currency: "INR",
            name: "Team Pricing Payment",
            description: "Payment for Team Pricing Plan",
            handler: function (response) {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                navigate('/success', { state: { teamSize, instanceType, durationInHours } }); 
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
        <section className="flex flex-col items-center justify-center min-h-screen bg-discount-gradient w-full p-8">
            <h2 className="text-gradient font-semibold text-4xl mb-6 text-center">Team Pricing Calculator</h2>

            <div className="bg-black-gradient-2 p-8 rounded-lg shadow-lg max-w-md w-full rounded-lg shadow-lg border border-white/20">
                <div className="mb-4">
                    <label htmlFor="teamSize" className="text-gradient font-bold text-lg mb-2 block text-black">Enter Team Size:</label>
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
                    <label htmlFor="instanceType" className="text-gradient font-bold text-lg mb-2 block">Select Instance Type:</label>
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
                    <label html for="duration" className="text-gradient font-bold text-lg mb-2 block text-black">Enter Duration (hours):</label>
                    <input
                        type="number"
                        id="duration"
                        value={durationInHours}
                        onChange={handleDurationChange}
                        min="1"
                        className="p-2 rounded border border-gray-300 w-1/4"
                    />
                </div>

                <div className="mb-4">
                    <p className="text-lg font-bold mb-2 block text-gradient">Total Price:</p>
                    <p className="text-lg mb-2 block text-white">${totalPriceUSD.toFixed(2)} (USD)</p>
                    <p className="text-lg mb-2 block text-white">₹{totalPriceINR.toFixed(2)} (INR)</p>
                </div>

                <button
                    className="bg-blue-gradient hover:bg-white text-black font-bold py-2 px-4 rounded border border-white/20"
                    onClick={handlePayment}
                >
                    Make Payment
                </button>
            </div>
        </section>
    );
}

export default Team;