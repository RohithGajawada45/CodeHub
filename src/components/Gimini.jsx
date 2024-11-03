import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import "./Gemini.css";

const Gemini = () => {
    const [inputValue, setInputValue] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    const genAI = new GoogleGenerativeAI('AIzaSyCX-q5H_yfNST1BbS2IdLhqJTiBmDqsymg');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const getResponseForGivenPrompt = async () => {
        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(inputValue);
            const responseText = result.response.text();
            setResponses([...responses, { text: responseText, isUser: false }]); 
            setResponses(prevResponses => [...prevResponses, { text: inputValue, isUser: true }]); 
            setInputValue(''); 
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-discount-gradient">
        <div className="gemini-bg-container bg-discount-gradient">
            <div className="gemini-center-container bg-black-gradient-2 border border-white/20">
                <h1 className="text-gradient font-bold text-xl">Ask AI..</h1>
                <br></br>
                <br></br>
                <div className="response-container text-left">
                    {/* Display chat responses first */}
                    {responses.map((response, index) => (
                        <div key={index} className={`response-text text-xl font-bold ${response.isUser ? 'text-white' : 'text-gradient'}`}>
                            {response.text}
                        </div>

                    ))}
                </div>
                {loading && <div className="font-bold text-gradient text-xl">Loading...</div>}
                <div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Ask me something..."
                        className="input-field"
                    />
                    <button onClick={getResponseForGivenPrompt} className="gemini-button bg-blue-gradient text-black font-bold py-2 px-4">
                        Send
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Gemini;
