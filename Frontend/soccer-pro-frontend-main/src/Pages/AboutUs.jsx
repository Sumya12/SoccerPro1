import React from 'react';
import Footer from './Footer';

export function AboutUs() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '50px auto',
      padding: '20px',
      maxWidth: '800px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f5f5f5'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'justify',
      margin: '20px'
    },
    highlightedText: {
      fontWeight: 'bold',
      color: '#e63946'
    }
  }

  return (
    <div>
    <div style={styles.container}>
      <h1>About Us</h1>
      <div style={styles.content}>
        <p>Welcome to our football club! We're a community of passionate football fans who come together to support our favorite team and enjoy the beautiful game.</p>
        <p>Our club was founded in <span style={styles.highlightedText}>[2023]</span> and since then we've grown to become one of the most respected and successful clubs in the region. We're committed to playing attractive, attacking football and promoting sportsmanship and fair play both on and off the pitch.</p>
        <p>At our club, we believe that football is more than just a game – it's a way of life. We're dedicated to providing our fans with an unforgettable matchday experience, with family-friendly facilities, exciting pre-match entertainment, and a welcoming atmosphere for fans of all ages and backgrounds.</p>
        <p>If you're a football fan looking for a new team to support, we'd love to have you join us. Come and experience the passion and excitement of live football at our next home game!</p>
      </div>
     
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
      <Footer></Footer>
      </div>
  );
}

export default AboutUs;