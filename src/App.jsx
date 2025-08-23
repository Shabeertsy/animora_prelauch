import React, { useEffect, useRef, useState } from "react";

// Lottie player is loaded via CDN in the original HTML. In React, we use <lottie-player> as a web component.
const LAUNCH_DAYS = 30;

function pad(n) {
  return String(n).padStart(2, "0");
}

function getCountdown(targetDate) {
  const now = new Date();
  const diff = Math.max(0, targetDate - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return {
    days: pad(days),
    hours: pad(hours),
    mins: pad(mins),
    secs: pad(secs),
  };
}

const features = [
  "Anime Figures",
  "Manga Merch",
  "Cosplay Accessories",
  "Collectibles",
  "Otaku Apparel",
];

const socials = [
  { href: "#", label: "in", title: "LinkedIn" },
  { href: "#", label: "tw", title: "Twitter" },
  { href: "#", label: "ig", title: "Instagram" },
];

export default function App() {
  const [theme, setTheme] = useState(false);
  const [countdown, setCountdown] = useState(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + LAUNCH_DAYS);
    return getCountdown(launchDate);
  });
  const [email, setEmail] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const pillsRef = useRef([]);

  // Set up launch date
  const launchDateRef = useRef();
  if (!launchDateRef.current) {
    const d = new Date();
    d.setDate(d.getDate() + LAUNCH_DAYS);
    launchDateRef.current = d;
  }

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(launchDateRef.current));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate feature pills on mount
  useEffect(() => {
    pillsRef.current.forEach((pill, i) => {
      if (pill) {
        pill.style.opacity = "0";
        pill.style.transform = "translateY(16px)";
        setTimeout(() => {
          pill.style.opacity = "1";
          pill.style.transform = "translateY(0)";
          pill.style.transition = "all 0.5s cubic-bezier(0.25,0.8,0.25,1)";
        }, i * 100 + 200);
      }
    });
  }, []);

  // Theme toggle
  useEffect(() => {
    if (theme) {
      document.body.classList.add("coconut");
    } else {
      document.body.classList.remove("coconut");
    }
  }, [theme]);

  // Dynamic year
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Lottie web component loader (for SSR safety)
  useEffect(() => {
    if (!window.customElements?.get("lottie-player")) {
      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Handlers
  function handleThemeToggle() {
    setTheme((t) => !t);
  }

  function handleNotify() {
    document.getElementById("email-input")?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLearn() {
    alert(
      "Animora: We offer anime figures, manga merch, cosplay accessories, collectibles, and otaku apparel. Want early access? Drop your email!"
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    // Here you would send the email to your backend
    alert(
      "Thanks — we saved your email and will send an invite to Animora shortly."
    );
    setEmail("");
  }

  return (
    <>
      <style>{`
        :root {
          --bg: #faf9f7;
          --panel: #ffffff;
          --text: #0b0b0b;
          --muted: #6b6b6b;
          --accent: #111111;
          --cta: #0b9b6a;
          --glass: rgba(255,255,255,0.6);
          --radius: 16px;
          --shadow-sm: 0 2px 8px rgba(0,0,0,0.05);
          --shadow-md: 0 8px 30px rgba(0,0,0,0.08);
          --shadow-lg: 0 15px 50px rgba(0,0,0,0.12);
          --transition: all 0.3s cubic-bezier(0.25,0.8,0.25,1);
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          color-scheme: light;
        }
        body.coconut {
          --bg: #fffdf6;
          --panel: #fffefb;
          --text: #07221e;
          --muted: #66706b;
          --accent: #2b2b2b;
          --cta: #e14b7b;
          background-image:
            radial-gradient(circle at 10% 10%, rgba(225, 75, 123, 0.03), transparent 12%),
            linear-gradient(180deg, rgba(255, 250, 240, 0.6), transparent 60%);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: var(--bg); color: var(--text); line-height: 1.6; }
        body { display: flex; flex-direction: column; padding: 24px; }
        .container {
          width: 100%; max-width: 1200px; margin: auto; flex: 1;
          display: flex; align-items: center; justify-content: center;
        }
        .card {
          width: 100%;
          background: linear-gradient(180deg, var(--panel), rgba(255,255,255,0.98));
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 0;
          transition: var(--transition);
        }
        @media (max-width: 980px) {
          .card { grid-template-columns: 1fr; }
        }
        .left {
          padding: 64px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: flex-start;
          justify-content: center;
          position: relative;
        }
        .right {
          background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(250,250,250,0.6));
          padding: 48px;
          border-left: 1px solid rgba(11,11,11,0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          position: relative;
        }
        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          line-height: 1.2;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
          color: var(--accent);
          font-weight: 700;
        }
        .tag {
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 12px;
          margin-bottom: 8px;
          display: inline-block;
        }
        p.lead {
          margin: 0;
          font-size: 18px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 90%;
        }
        .features {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          flex-wrap: wrap;
        }
        .pill {
          background: var(--glass);
          padding: 10px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          color: var(--text);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(11,11,11,0.05);
          transition: var(--transition);
          opacity: 0;
          transform: translateY(16px);
        }
        .pill:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .cta-row {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 24px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 12px;
          border: 0;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
          font-size: 15px;
        }
        .btn-primary {
          background: var(--accent);
          color: white;
          box-shadow: var(--shadow-md);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          background: var(--cta);
        }
        .btn-outline {
          background: transparent;
          border: 1px solid rgba(11,11,11,0.1);
          color: var(--accent);
        }
        .btn-outline:hover {
          background: rgba(11,11,11,0.02);
          transform: translateY(-2px);
        }
        .meta {
          display: flex;
          gap: 24px;
          align-items: center;
          margin-top: 24px;
          color: var(--muted);
          font-size: 14px;
        }
        .logo {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .logo svg {
          width: 48px;
          height: 48px;
        }
        .small {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
        }
        .countdown {
          display: flex;
          gap: 12px;
          margin: 24px 0;
        }
        .countdown .block {
          background: rgba(11,11,11,0.06);
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          min-width: 80px;
          transition: var(--transition);
        }
        .countdown .block:hover {
          transform: translateY(-4px);
          background: rgba(11,11,11,0.1);
        }
        .countdown .num {
          font-weight: 800;
          font-size: 20px;
        }
        .countdown .lbl {
          font-size: 12px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 4px;
        }
        form.subscribe {
          width: 100%;
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .subscribe input[type="email"] {
          flex: 1;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(11,11,11,0.1);
          font-size: 15px;
          transition: var(--transition);
        }
        .subscribe input[type="email"]:focus {
          outline: none;
          border-color: var(--cta);
          box-shadow: 0 0 0 3px rgba(225, 75, 123, 0.1);
        }
        .socials {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .socials a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          border: 1px solid rgba(11,11,11,0.06);
          text-decoration: none;
          color: var(--accent);
          font-weight: 700;
          transition: var(--transition);
        }
        .socials a:hover {
          transform: translateY(-2px);
          background: rgba(11,11,11,0.02);
          box-shadow: var(--shadow-sm);
        }
        .lottie-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .lottie-small {
          width: 120px;
          height: 120px;
        }
        .lottie-large {
          width: 240px;
          height: 240px;
        }
        .theme-toggle {
          position: absolute;
          left: 24px;
          top: 24px;
        }
        .theme-toggle button {
          background: transparent;
          border: 1px solid rgba(11,11,11,0.06);
          padding: 10px 14px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: var(--transition);
        }
        .theme-toggle button:hover {
          background: rgba(11,11,11,0.02);
        }
        footer {
          padding: 24px;
          text-align: center;
          color: var(--muted);
          font-size: 14px;
          margin-top: 32px;
        }

        /* Responsive styles */
        @media (max-width: 980px) {
          .card { grid-template-columns: 1fr; }
          .right {
            border-left: none;
            border-top: 1px solid rgba(11,11,11,0.03);
            padding-top: 32px;
            padding-bottom: 32px;
          }
        }
        @media (max-width: 768px) {
          body { padding: 8px; }
          .container { padding: 0; }
          .left, .right { padding: 32px 12px; }
          h1 { font-size: 24px; }
          p.lead { font-size: 15px; max-width: 100%; }
          .cta-row { flex-direction: column; align-items: stretch; gap: 10px; }
          .countdown { flex-wrap: wrap; justify-content: center; gap: 8px; }
          .countdown .block { min-width: 48px; padding: 8px; }
          .lottie-large { width: 120px; height: 120px; }
          .lottie-small { width: 80px; height: 80px; }
          .logo svg { width: 36px; height: 36px; }
          .logo span { font-size: 18px !important; }
          .theme-toggle { left: 8px; top: 8px; }
          .features { gap: 8px; }
        }
        @media (max-width: 480px) {
          .card { border-radius: 0; box-shadow: none; }
          .left, .right { padding: 18px 4px; }
          .logo svg { width: 28px; height: 28px; }
          .lottie-large { width: 80px; height: 80px; }
          .lottie-small { width: 48px; height: 48px; }
          .btn, .btn-primary, .btn-outline { font-size: 13px; padding: 10px 12px; }
          .subscribe input[type="email"] { font-size: 13px; padding: 10px 8px; }
          .socials a { width: 36px; height: 36px; font-size: 13px; }
        }
      `}</style>
      <div className="container">
        <div className="card" role="region" aria-label="Animora pre-launch">
          <div className="left">
            <div className="theme-toggle">
              <button
                id="themeBtn"
                aria-pressed={theme}
                onClick={handleThemeToggle}
                type="button"
              >
                {theme ? "Classic (off-white)" : "Animora theme"}
              </button>
            </div>
            <div className="logo" aria-hidden="false">
              {/* Minimalist anime logo mark */}
              <svg
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
                style={{ display: "block" }}
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill={theme ? "#e14b7b" : "#0b9b6a"}
                  opacity="0.12"
                />
                <ellipse
                  cx="24"
                  cy="24"
                  rx="14"
                  ry="18"
                  fill={theme ? "#e14b7b" : "#0b9b6a"}
                  opacity="0.18"
                />
                <ellipse
                  cx="24"
                  cy="24"
                  rx="10"
                  ry="14"
                  fill={theme ? "#fff" : "#fff"}
                  stroke={theme ? "#e14b7b" : "#0b9b6a"}
                  strokeWidth="2"
                />
                <ellipse
                  cx="24"
                  cy="20"
                  rx="3"
                  ry="2"
                  fill={theme ? "#e14b7b" : "#0b9b6a"}
                  opacity="0.7"
                />
              </svg>
              <div>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 22,
                    letterSpacing: "-0.03em",
                    color: "var(--accent)",
                  }}
                >
                  Animora
                </span>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--muted)",
                    marginTop: 4,
                  }}
                >
                  Anime Merch • Otaku E-commerce
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <div className="tag">Launching Soon</div>
              <h1>
                Your gateway to the world of anime — figures, merch, and more!
              </h1>
              <p className="lead">
                Animora brings you the best of anime culture: authentic figures,
                manga, cosplay, and collectibles. Shop with confidence and join
                a passionate otaku community. Level up your collection — coming
                soon!
              </p>
              <div className="lottie-container">
                <lottie-player
                  src="https://assets1.lottiefiles.com/packages/lf20_1a8dx7zj.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoPlay
                  style={{ width: 100, height: 100, maxWidth: "100%" }}
                  class="lottie-small"
                ></lottie-player>
              </div>
              <div className="features" aria-hidden="false">
                {features.map((f, i) => (
                  <div
                    className="pill"
                    key={f}
                    ref={(el) => (pillsRef.current[i] = el)}
                  >
                    {f}
                  </div>
                ))}
              </div>
              <div className="cta-row">
                <button
                  className="btn btn-primary"
                  id="notifyBtn"
                  type="button"
                  onClick={handleNotify}
                >
                  Notify me
                </button>
                <button
                  className="btn btn-outline"
                  id="learnBtn"
                  type="button"
                  onClick={handleLearn}
                >
                  What we do →
                </button>
              </div>
              <div className="meta">
                <div className="small">
                  Curious? Leave your email and we'll reach out with an invite.
                </div>
              </div>
            </div>
          </div>
          <aside className="right" aria-hidden="false">
            <img
              src="/generated-image.png"
              alt="Animora logo"
              style={{ width: "100%", maxWidth: 150, height: "auto" }}
            />
            <div style={{ width: "100%", maxWidth: 320, textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div className="small">Estimated release</div>
              </div>
              <div className="countdown" aria-live="polite" id="countdown">
                <div className="block">
                  <div className="num" id="days">
                    {countdown.days}
                  </div>
                  <div className="lbl">Days</div>
                </div>
                <div className="block">
                  <div className="num" id="hours">
                    {countdown.hours}
                  </div>
                  <div className="lbl">Hours</div>
                </div>
                <div className="block">
                  <div className="num" id="mins">
                    {countdown.mins}
                  </div>
                  <div className="lbl">Minutes</div>
                </div>
                <div className="block">
                  <div className="num" id="secs">
                    {countdown.secs}
                  </div>
                  <div className="lbl">Seconds</div>
                </div>
              </div>
              <div className="lottie-container">
                <lottie-player
                  src="https://assets1.lottiefiles.com/packages/lf20_obhph3sh.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoPlay
                  class="lottie-large"
                  style={{ maxWidth: "100%" }}
                ></lottie-player>
              </div>
              <form
                className="subscribe"
                id="subscribeForm"
                aria-label="Subscribe to Animora launch"
                onSubmit={handleSubmit}
                autoComplete="off"
                style={{ flexWrap: "wrap" }}
              >
                <input
                  type="email"
                  id="email-input"
                  placeholder="your@email.com"
                  aria-label="email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  style={{ minWidth: 0 }}
                />
                <button className="btn btn-primary" type="submit">
                  Get invite
                </button>
              </form>
              <div
                style={{ marginTop: 24 }}
                className="socials"
                aria-hidden="false"
              >
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    title={s.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <footer>
        © <span id="year">{year}</span> Animora — Crafted for otaku.{" "}
        <span style={{ opacity: 0.7 }}>Anime. Collect. Connect.</span>
      </footer>
    </>
  );
}
