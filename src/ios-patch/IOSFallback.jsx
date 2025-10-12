import "./IOSFallback.css";

function IOSFallback() {
  return (
    <div className="ios-fallback">
      <div className="ios-fallback-content">
        <div className="ios-fallback-icon">⚠️</div>
        <h1 className="ios-fallback-title">Sorry about that</h1>
        <p className="ios-fallback-message">
          We've discovered an issue with iOS browsers that causes our app to
          crash.
        </p>
        <p className="ios-fallback-submessage">
          We're working hard to fix it! In the meantime, please try accessing
          this page using:
        </p>
        <ul className="ios-fallback-alternatives">
          <li>Any desktop browser</li>
          <li>Any Android browser</li>
        </ul>
        <p className="ios-fallback-footer">
          Thank you for your patience and understanding.
        </p>
      </div>
    </div>
  );
}

export default IOSFallback;
