import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('XYZ Fitness render error:', error);
    console.error('Error Stack:', error.stack);
    console.error('Component Stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: '100vh',
            background: '#090909',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            padding: '48px 24px'
          }}
        >
          <div style={{ maxWidth: 720, margin: '10vh auto' }}>
            <p
              style={{
                color: '#ff5a1f',
                letterSpacing: 3,
                fontWeight: 700
              }}
            >
              XYZ FITNESS
            </p>

            <h1>
              Something went wrong while loading the website.
            </h1>

            <p style={{ color: '#bbb', lineHeight: 1.7 }}>
              Check the browser console for more information.
            </p>

            <pre
              style={{
                whiteSpace: 'pre-wrap',
                background: '#191919',
                padding: 18,
                border: '1px solid #444',
                color: '#ffb199',
                overflowWrap: 'anywhere'
              }}
            >
              {this.state.error?.stack ||
                this.state.error?.message ||
                'Unknown error'}
            </pre>

            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#ff5a1f',
                border: 0,
                padding: '14px 20px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
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
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);