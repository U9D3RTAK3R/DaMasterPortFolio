import { Link } from "react-router-dom";
import { CustomPointer } from "@/components/CustomPointer";

export const NotFound = () => (
  <div
    style={{
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--paper-0)",
      gap: "var(--space-lg)",
      padding: "var(--page-gutter)",
    }}
  >
    <CustomPointer />
    <div className="terminal" style={{ maxWidth: 620, width: "100%" }}>
      <div className="terminal__bar">
        <span className="terminal__dot terminal__dot--r" />
        <span className="terminal__dot terminal__dot--y" />
        <span className="terminal__dot terminal__dot--g" />
        <span className="terminal__name">aritra@dev ~ error.log</span>
      </div>
      <div className="terminal__body" style={{ fontSize: "0.95rem" }}>
        <div>
          <span className="tc">{"// Error 404 — page not found"}</span>
        </div>
        <div>
          <span className="tk">{'"status"'}</span>:{" "}
          <span className="tc">404</span>,
        </div>
        <div>
          <span className="tk">{'"message"'}</span>:{" "}
          <span className="ts">
            {'"The requested resource could not be located in any available dimension."'}
          </span>
        </div>
        <div>
          <span className="tk">{'"suggestion"'}</span>:{" "}
          <span className="ts">{'"Return to known coordinates."'}</span>
          <span className="cursor" style={{ marginLeft: 4 }} />
        </div>
      </div>
    </div>
    <Link to="/" className="btn btn--solid">
      Return to base
    </Link>
  </div>
);
