import React, { useState } from 'react';

// Inline styles
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    marginTop: '20px',
  },
  content: {
    width: '360px',
    height: '40px',
    boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '60px',
    overflow: 'hidden',
  },
  subscription: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  input: {
    flexGrow: 1,
    height: '100%',
    padding: '0 20px',
    outline: 'none',
    background: 'transparent',
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100px',
    border: 'none',
    borderRadius: '60px',
    margin: '1px',
    cursor: 'pointer',
    backgroundColor: '#4ABEBB',
    color: '#FFFFFF',
    transition: 'width 0.35s ease-in-out, background 0.35s ease-in-out',
  },
  buttonText: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    lineHeight: '38px',
    transition: 'visibility 0.35s ease-in-out, opacity 0.35s ease-in-out',
  },
  hidden: {
    visibility: 'hidden',
    opacity: 0,
  },
  visible: {
    visibility: 'visible',
    opacity: 1,
  },
};

const SubscriptionWidget: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSubscribe = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      setSubscribed(true);

      // Make the API call
      try {
        const response = await fetch('https://blog.sayaan.in/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            operationName: "SubscribeToNewsletter",
            query: "mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) { subscribeToNewsletter(input: $input) { status __typename } }",
            variables: {
              input: {
                email,
                publicationId: "6649a7ce24e9b21fd745294b",
              },
            },
          }),
        });
        const result = await response.json();
        console.log('Subscription Result:', result); // For debugging

        // Reset state after a delay
        setTimeout(() => {
          setFadeOut(true); // Start fading out the thank you message
          setTimeout(() => {
            setSubscribed(false); // Reset subscribed state to false after fade-out
            setEmail(''); // Clear the email input
            setFadeOut(false); // Reset fade state for future use
          }, 350); // Delay to allow fading out to complete
        }, 1200); // Show thank you message for 3 seconds
      } catch (error) {
        console.error('Subscription Error:', error);
      }
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.subscription}>
          <input
            type="email"
            placeholder="subscribe@me.now"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button
            style={{
              ...styles.button,
              backgroundColor: subscribed ? '#000000' : '#2461FF',
              width: subscribed ? 'calc(100% - 2px)' : '100px',
            }}
            onClick={handleSubscribe}
          >
            <span
              style={{
                ...styles.buttonText,
                ...(subscribed ? styles.hidden : styles.visible),
              }}
            >
              Subscribe
            </span>
            <span
              style={{
                ...styles.buttonText,
                ...(subscribed && !fadeOut ? styles.visible : styles.hidden),
                transitionDelay: '0.35s',
              }}
            >
              Thank you for subscribing!
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionWidget;
