import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="not-found-page" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#06060e',
      gap: '2rem',
    }}>
      <div className="cyber-term" style={{ maxWidth: 600, width: '100%' }}>
        <div className="cyber-term-bar">
          <span className="cyber-term-dot r" />
          <span className="cyber-term-dot y" />
          <span className="cyber-term-dot g" />
          <span className="cyber-term-fname">aritra@dev ~ error.log</span>
        </div>
        <div className="cyber-term-body nf-body">
          <div><span className="tc">// Error 404 — Page Not Found</span></div>
          <div><span className="tk">"status"</span>: <span className="tn">404</span>,</div>
          <div><span className="tk">"message"</span>: <span className="ts">"The requested resource could not be located in any available dimension."</span></div>
          <div><span className="tk">"suggestion"</span>: <span className="ts">"Return to known coordinates."</span><span className="cyber-cur" /></div>
        </div>
      </div>
      <Link
        to="/"
        className="cyber-button"
      >
        RETURN TO BASE
      </Link>

      <style>{`
        .not-found-page { padding: 2rem; }
        .not-found-page .cyber-term-fname { font-size: 1rem; }
        .not-found-page .nf-body { font-size: 1.25rem; padding: 1.5rem 2rem; }
        .not-found-page .cyber-button { font-size: 1rem; padding: 1.2rem 3rem; }
      `}</style>
    </div>
  )
}
