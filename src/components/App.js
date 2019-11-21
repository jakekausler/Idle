import React from 'react';
import './App.css';
import MainContent from './maincontent/MainContent';
import Footer from './footer/Footer';

export default function App() {
  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <MainContent />
      <Footer />
    </div>
  );
}
