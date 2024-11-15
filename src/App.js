import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chatbot from './Chatbot';
import Contact from './Contact';
import './App.css';

const Home = () => {
  return (
    <div className="App">
      <header className="header">
        <h1>Hello, I'm Brandon Johnson</h1>
        <img src="https://i.ibb.co/17yQNGR/Brandon.png" alt="Brandon" width="200" height="300"></img>
        <p>Kean Student | Tech Enthusiast</p>
      </header>
      <Chatbot />
      <section className="about">
        <h2>About Me</h2>
        <p>I am a 21 year old senior at Kean University. 
          I am pursuing a B.S. in Information Technology (IT).</p>
      </section>
      <section className="hobbies">
        <h2>My Hobbies</h2>  
        <p>I enjoy gaming, driving, and watching shows.</p>
        <p>Here are some of my current games/shows:</p>
        <img src="https://media.graphassets.com/REokPJTTZKUuLke98RWI" alt="Sparking Zero" width="400" height="500"></img>
        <img src="https://i.ebayimg.com/images/g/QiAAAOSwMzZl-Gj0/s-l1200.jpg" alt="Avatar" width="400" height="500"></img>
        <img src="https://res.cloudinary.com/zenbusiness/image/upload/v1670445040/logaster/logaster-2022-07-one-piece-logo-min.jpg" alt="One Piece" width="500" height="500"></img>
      </section>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact Me</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
