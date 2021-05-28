import React from 'react';
// import section
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Form = () => {

  return (
    <>
      <Header navPosition="right" className="reveal-from-bottom" />
      <main className="site-content">
        {/* {children} */}
        <h1>Hi THERE</h1>
      </main>
      <Footer />
    </>
  );
}

export default Form;