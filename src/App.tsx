import React from 'react';
import './App.css';
import './sass/styles.scss'
import MainContainer from './container/Weather/mainContainer';
import Footer from './components/footer'
function App() {
  
  return (
    <div className="App">
      <>
        <MainContainer/>
        <Footer/>
      </>
      
    </div>
  );
}

export default App;
