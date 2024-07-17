import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import summarizerImage from '../images/summarizer-image.png';
import qnaGeneratorImage from '../images/qna-generator-image.png';
import flashcardsImage from '../images/flashcards-image.png';

const Home = () => {
  return (
    <div className="home">
      <div className="video-container">
        <video autoPlay loop muted>
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="options-container">
        <Link to="/summarizer" className="option summarizer">
          <div className="content">
            <h2>Summarizer</h2>
            <p>Quickly summarize text with ease.</p>
          </div>
          <img src={summarizerImage} alt="Summarizer" />
        </Link>

        <Link to="/qandagenerator" className="option qna-generator">
          <img src={qnaGeneratorImage} alt="Q&A Generator" />
          <div className="content">
            <h2>Q&A Generator</h2>
            <p>Generate questions and answers effortlessly.</p>
          </div>
        </Link>

        <Link to="/flashcards" className="option flashcards">
          <div className="content">
            <h2>Flashcards</h2>
            <p>Create flashcards for effective learning.</p>
          </div>
          <img src={flashcardsImage} alt="Flashcards" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
