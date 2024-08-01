import React, { useState } from 'react';
import './admin/faq.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item" onClick={toggleOpen}>
      <div className="faq-question">
        {question}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "What types of jewelry do you offer for rent?",
      answer: "We offer a wide range of jewelry, including necklaces, earrings, bracelets, rings, and tiaras. Our collection features pieces suitable for various occasions, from weddings to parties and formal events.",
    },
    {
      question: "How can I view the jewelry available for rent?",
      answer: " You can view our collection online through our website, where each piece is listed with detailed descriptions and high-resolution images. We also have a physical showroom that you can visit by appointment.",
    },
    {
      question: " How do I rent jewelry?",
      answer: "To rent jewelry, browse our online catalog, select the items you want, and add them to your cart. Proceed to checkout, where you’ll provide your rental dates and shipping information. Alternatively, you can visit our showroom and make your selections in person.",
    },
    {
      question: " How long can I rent jewelry for?",
      answer: " Our standard rental period is 7 days. If you need the jewelry for a longer duration, please contact us to discuss extended rental options.",
    },
  ];

  return (
    <>
    <Navbar />
    <div className="faq">
      <h1>Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default FAQ;
