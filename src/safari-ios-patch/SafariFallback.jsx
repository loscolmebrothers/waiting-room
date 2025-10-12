import "./SafariFallback.css";

function SafariFallback() {
  return (
    <div className="safari-fallback">
      <div className="safari-fallback-content">
        <div className="safari-fallback-icon">⚠️</div>
        <h1 className="safari-fallback-title">Sorry about that</h1>
        <p className="safari-fallback-message">
          We've discovered an issue with Safari on iOS that causes our app to crash.
        </p>
        <p className="safari-fallback-submessage">
          We're working hard to fix it! In the meantime, please try accessing this page using:
        </p>
        <ul className="safari-fallback-alternatives">
          <li>Chrome for iOS</li>
          <li>Firefox for iOS</li>
          <li>Any desktop browser</li>
        </ul>
        <p className="safari-fallback-footer">
          Thank you for your patience and understanding.
        </p>
      </div>
    </div>
  );
}

export default SafariFallback;
