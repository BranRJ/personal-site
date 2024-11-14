import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track API call state

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return; // Prevent sending empty messages or spamming

    const userMessage = { role: 'user', content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput('');
  setIsLoading(true); // Block further input until the API responds

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const botReply = await callOpenAI([...messages, userMessage]);
    const botMessage = { role: 'assistant', content: botReply };
    setMessages((prev) => [...prev, botMessage]);
    
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const callOpenAI = async (messages, retries = 3) => {
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer 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`,
              }
            }
          );
          return response.data.choices[0].message.content;
        } catch (error) {
          if (error.response?.status === 429 && retries > 0) {
            console.warn(`Rate limit hit. Retrying in ${(4 - retries) * 2} seconds...`);
            await delay((4 - retries) * 2000);  // Delay between retries
            return callOpenAI(messages, retries - 1);  // Retry with reduced attempts
          } else {
            throw error;
          }
        }
      };
      
      setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error);
    setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I am currently unavailable. Please try again later.' }]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="chatbot-wrapper">
      <button className="chatbot-toggle" onClick={handleToggle}>
        {isOpen ? 'Close Chat' : 'Chat with Me!'}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <p>{msg.content}</p>
              </div>
            ))}
            {isLoading && <p className="loading">Thinking...</p>} {/* Loader */}
          </div>
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading} // Disable input while loading
            />
            <button type="submit" disabled={isLoading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
