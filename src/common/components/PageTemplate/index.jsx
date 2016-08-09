import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const PageTemplate = ({
  children
}) => {
  return (
    <div>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </div>
  );
}

export default PageTemplate;