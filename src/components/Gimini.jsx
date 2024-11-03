// src/GeminiAIComponent.js
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import "./Gemini.css";

const Gemini = () => {
    const [inputValue, setInputValue] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    // Initialize the Google Generative AI instance
    const genAI = new GoogleGenerativeAI('AIzaSyCX-q5H_yfNST1BbS2IdLhqJTiBmDqsymg');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const getResponseForGivenPrompt = async () => {
        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(inputValue);
            const responseText = result.response.text(); // Extract the text from the response
            setResponses([...responses, { text: responseText, isUser: false }]); // Update the responses state
            setResponses(prevResponses => [...prevResponses, { text: inputValue, isUser: true }]); // Add user input
            setInputValue(''); // Clear the input field
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Google Generative AI Chat</h1>
            <div className="response-container">
                {/* Display chat responses first */}
                {responses.map((response, index) => (
                    <div key={index} className={`response-text ${response.isUser ? 'user-response' : ''}`}>
                        {response.text}
                    </div>
                ))}
            </div>
            {loading && <div>Loading...</div>}
            <div>
                {/* Input field and button come after the chat responses */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask me something..."
                    className="input-field"
                />
                <button onClick={getResponseForGivenPrompt} className="btn btn-primary">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Gemini;