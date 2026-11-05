import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    console.error('XYZ Fitness render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{
          minHeight: '100vh',
          background: '#090909',
          color: '#fff',
          fontFamily: 'Arial,sans-serif',
          padding: '48px 24px'
        }}>
          <div style={{ maxWidth: 720, margin: '10vh auto' }}>
            <p style={{ color: '#ff5a1f', letterSpacing: 3, fontWeight: 700 }}>
              XYZ FITNESS
            </p>
            <h1>Something went wrong while loading the website.</h1>
            <p style={{ color: '#bbb', lineHeight: 1.7 }}>
              Open the browser console and check the error.
            </p>
            <pre style={{
              whiteSpace: 'pre-wrap',
              background: '#191919',
              padding: 18,
              color: '#ffb199'
            }}>
              {String(this.state.error)}
            </pre>
            <button onClick={() => window.location.reload()}>
              RELOAD WEBSITE
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <BrowserRouter basename="/xyz-fitness">
        <App />
      </BrowserRouter>
    </AppErrorBoundary>
  </React.StrictMode>
);