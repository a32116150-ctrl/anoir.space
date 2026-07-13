import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Window crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="h-full flex flex-col items-center justify-center p-6 text-white font-mono text-sm"
          style={{ background: '#000080' }}
        >
          <div className="max-w-md text-center">
            <h2 className="bg-[#c0c0c0] text-[#000080] px-3 py-0.5 inline-block font-bold mb-4">
              Windows
            </h2>
            <p className="mb-3 leading-relaxed text-left">
              A fatal exception has occurred in this window. The current application will be terminated.
            </p>
            <p className="mb-3 leading-relaxed text-left text-xs opacity-80">
              * Don&apos;t worry — your portfolio is fine. This window just had a bad day.
            </p>
            <p className="mb-4 text-left">
              Press any key to restart this window, or<br/>
              press CTRL+ALT+DEL to return to the desktop.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-1.5 bg-[#c0c0c0] text-black border-2 border-white shadow-win-out active:shadow-win-in font-bold text-xs hover:bg-gray-300 transition-colors"
            >
              Press to Restart Window
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
