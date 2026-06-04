import { useState, useEffect, useRef } from 'react';

/* ── SERVICES DATA ── */
const SERVICES = [
  { num: '01', title: 'Design Premium', desc: "Des interfaces uniques, pensées pour votre identité. Chaque pixel est intentionnel, chaque détail soigné pour laisser une impression durable.", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { num: '02', title: 'Développement Web', desc: "Des sites rapides, sécurisés et évolutifs. Technologies modernes adaptées à vos besoins, de la landing page au site vitrine complet.", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { num: '03', title: 'Référencement SEO', desc: "Soyez trouvé par vos futurs clients. Optimisation technique et stratégique pour une visibilité maximale sur les moteurs de recherche.", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
  { num: '04', title: 'Site Vitrine', desc: "Valorisez votre activité avec un site vitrine professionnel. Présentation élégante, formulaire de contact, galerie — tout pour convaincre.", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
  { num: '05', title: 'Maintenance & Support', desc: "Votre site évolue avec vous. Mises à jour, modifications, support réactif — nous restons à vos côtés bien après la mise en ligne.", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { num: '06', title: 'Accompagnement Stratégique', desc: "Conseil personnalisé pour définir votre stratégie digitale. Nos profils complémentaires tech & business au service de votre réussite.", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
];

/* ── PARTICLES ── */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;
    const pts = [];
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 60; i++) pts.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: Math.random() * 1.5 + 0.3, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, a: Math.random(), va: (Math.random() - 0.5) * 0.008 });
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += p.va;
        if (p.a < 0 || p.a > 1) p.va *= -1;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,179,71,${p.a * 0.6})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />;
}

/* ── REVEAL HOOK ── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(r => observer.observe(r));
    return () => observer.disconnect();
  }, []);
}

/* ── NAV ── */
function Nav({ scrolled, showFloat }) {
  const scroll = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 5vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? 64 : 80,
        background: scrolled ? 'rgba(18,13,31,0.97)' : 'rgba(18,13,31,0.88)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,107,26,0.2)',
        transition: 'all 0.4s',
      }}>
        <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ textDecoration: 'none' }}>
  <img src="/logo.png" alt="Tonel" style={{ height: 90, objectFit: 'contain' }} />
</a>
        <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', alignItems: 'center' }}>
          {[['services','Services'],['story','Notre histoire'],['contact','Contact']].map(([id,label]) => (
            <li key={id}>
              <NavPill label={label} onClick={() => scroll(id)} />
            </li>
          ))}
          <li>
            <NavPill label="✦ Devis gratuit" onClick={() => scroll('devis')} cta />
          </li>
        </ul>
      </nav>
      {showFloat && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50 }}>
          <button onClick={() => scroll('devis')} style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.8rem 1.8rem',
            background: 'linear-gradient(135deg,#FF6B1A,#FFB347)',
            color: '#120D1F', border: 'none', cursor: 'pointer',
            fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            borderRadius: '100px', boxShadow: '0 8px 32px rgba(255,107,26,0.5)',
            fontFamily: "'Outfit',sans-serif",
          }}>✦ Devis gratuit</button>
        </div>
      )}
    </>
  );
}

function NavPill({ label, onClick, cta }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: 'flex', alignItems: 'center', gap: '0.4rem',
      padding: cta ? '0.55rem 1.6rem' : '0.45rem 1.1rem',
      borderRadius: '100px',
      border: cta ? 'none' : `1.5px solid ${hover ? 'transparent' : 'rgba(255,107,26,0.3)'}`,
      background: cta
        ? 'linear-gradient(135deg,#FF6B1A,#FFB347)'
        : hover ? 'linear-gradient(135deg,#FF6B1A,#FFB347)' : 'transparent',
      color: cta ? '#120D1F' : hover ? '#fff' : 'rgba(255,255,255,0.85)',
      fontSize: '0.8rem', fontWeight: cta ? 600 : 500, letterSpacing: '0.04em',
      cursor: 'pointer', transition: 'all 0.25s',
      boxShadow: hover ? '0 8px 24px rgba(255,107,26,0.35)' : 'none',
      transform: hover ? 'translateY(-2px)' : 'none',
      fontFamily: "'Outfit',sans-serif",
    }}>
      {!cta && <div style={{ width: 6, height: 6, borderRadius: '50%', background: hover ? '#fff' : '#FF6B1A', transition: 'background 0.25s' }} />}
      <span>{label}</span>
    </button>
  );
}

/* ── HERO ── */
function Hero() {
  const scroll = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '0 5vw' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#120D1F 0%,#1C1028 20%,#2D1B10 55%,#4A1E00 80%,#FF4500 100%)' }} />
      {/* Glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 60% at 50% 100%,rgba(255,107,26,0.6) 0%,transparent 55%),radial-gradient(ellipse 50% 40% at 50% 85%,rgba(255,179,71,0.35) 0%,transparent 50%)' }} />
      {/* Rays */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '200%', height: '80%', background: 'repeating-conic-gradient(from 0deg at 50% 100%,rgba(255,107,26,0.04) 0deg,transparent 2deg,transparent 10deg,rgba(255,179,71,0.04) 12deg,transparent 14deg)', animation: 'raysRotate 30s linear infinite' }} />
      {/* Orbs */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', filter: 'blur(60px)', background: 'rgba(255,107,26,0.25)', bottom: '10%', left: '5%', animation: 'floatOrb 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', filter: 'blur(60px)', background: 'rgba(255,179,71,0.2)', bottom: '20%', right: '10%', animation: 'floatOrb 11s ease-in-out infinite reverse' }} />
      {/* Horizon */}
      <div style={{ position: 'absolute', bottom: '30%', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,179,71,0.4),rgba(255,255,255,0.6),rgba(255,179,71,0.4),transparent)', animation: 'horizonPulse 4s ease-in-out infinite' }} />
      {/* Particles */}
      <Particles />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FFB347', fontWeight: 500, marginBottom: '2rem', animation: 'fadeUp 0.8s ease 0.3s both' }}>
          Agence Web Premium &nbsp;·&nbsp; Paris
        </div>
        <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(3.2rem,7.5vw,7rem)', fontWeight: 700, lineHeight: 1.12, color: '#fff', letterSpacing: '-0.04em', marginBottom: '2rem', animation: 'fadeUp 0.9s ease 0.5s both' }}>
          Votre site,<br />
          <span style={{ fontWeight: 300, background: 'linear-gradient(135deg,#FF8C42,#FFD280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>votre image,</span><br />
          <span style={{ fontWeight: 300, WebkitTextStroke: '1.5px rgba(255,179,71,0.45)', color: 'transparent', WebkitTextFillColor: 'transparent' }}>sans compromis.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,248,242,0.6)', lineHeight: 1.75, maxWidth: 540, marginBottom: '3rem', fontWeight: 300, animation: 'fadeUp 0.9s ease 0.7s both' }}>
          Tonel conçoit des sites internet sur mesure pour les particuliers et entrepreneurs qui refusent le compromis entre esthétique et performance.
        </p>
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flexWrap: 'wrap', animation: 'fadeUp 0.9s ease 0.9s both' }}>
          <HeroBtn primary onClick={() => scroll('devis')}>Devis gratuit →</HeroBtn>
          <HeroBtn onClick={() => scroll('services')}>Découvrir nos services</HeroBtn>
        </div>
      </div>

      {/* Stats */}
      <div style={{ position: 'absolute', right: '5vw', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '3rem', animation: 'fadeIn 1s ease 1.2s both' }}>
        {[['100%','Sur-mesure'],['48h','Premier retour']].map(([n,l]) => (
          <div key={n} style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '3.2rem', fontWeight: 700, background: 'linear-gradient(135deg,#fff,#FFD280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, display: 'block' }}>{n}</span>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,248,242,0.4)', marginTop: '0.2rem' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,248,242,0.3)', fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', animation: 'fadeIn 1s ease 1.5s both' }}>
        <div style={{ width: 22, height: 36, border: '1.5px solid rgba(255,179,71,0.3)', borderRadius: 100, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div style={{ width: 3, height: 8, background: '#FFB347', borderRadius: 3, animation: 'scrollDown 1.8s ease-in-out infinite' }} />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

function HeroBtn({ children, onClick, primary }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      padding: '0.9rem 2.6rem',
      background: primary ? 'linear-gradient(135deg,#FF6B1A,#FFB347)' : 'transparent',
      color: primary ? '#120D1F' : 'rgba(255,248,242,0.85)',
      border: primary ? 'none' : '1.5px solid rgba(255,179,71,0.4)',
      borderRadius: 100, fontSize: '0.85rem', fontWeight: primary ? 600 : 400,
      letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
      transform: hover ? 'translateY(-3px)' : 'none',
      boxShadow: hover && primary ? '0 16px 48px rgba(255,107,26,0.5)' : 'none',
      transition: 'all 0.3s', fontFamily: "'Outfit',sans-serif",
    }}>{children}</button>
  );
}

/* ── SERVICES ── */
function Services() {
  return (
    <section id="services" style={{ padding: '8rem 5vw', background: '#FFF8F2', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -300, right: -300, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,26,0.06) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', alignItems: 'end', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
        <div>
          <SectionLabel>Ce que nous faisons</SectionLabel>
          <h2 style={h2Style}>Des sites qui<br /><em style={emStyle}>marquent les esprits</em></h2>
        </div>
        <p style={{ fontSize: '1rem', color: '#5C3D20', lineHeight: 1.8, fontWeight: 300, maxWidth: 440 }}>De la conception à la mise en ligne, nous prenons en charge chaque aspect de votre projet digital avec un soin du détail exceptionnel.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem', position: 'relative', zIndex: 1 }}>
        {SERVICES.map(({ num, title, desc, icon }, i) => (
          <ServiceCard key={num} num={num} title={title} desc={desc} icon={icon} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ num, title, desc, icon, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <div className={`reveal reveal-delay-${Math.min(delay > 0 ? Math.ceil(delay / 0.12) : 0, 5)}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      background: '#fff', border: `1px solid ${hover ? 'rgba(255,107,26,0.25)' : 'rgba(255,107,26,0.1)'}`,
      borderRadius: 16, padding: '2.4rem 2rem',
      transform: hover ? 'translateY(-6px)' : 'none',
      boxShadow: hover ? '0 20px 60px rgba(255,107,26,0.12)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#FF6B1A,#FFB347)', transform: hover ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease', borderRadius: '16px 16px 0 0' }} />
      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#FF6B1A', marginBottom: '1.2rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{num}</div>
      <div style={{ width: 48, height: 48, background: hover ? 'linear-gradient(135deg,#FF6B1A,#FFB347)' : 'linear-gradient(135deg,rgba(255,107,26,0.1),rgba(255,179,71,0.08))', border: `1px solid ${hover ? 'transparent' : 'rgba(255,107,26,0.15)'}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', transition: 'all 0.3s', boxShadow: hover ? '0 8px 24px rgba(255,107,26,0.35)' : 'none' }}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, stroke: hover ? '#fff' : '#FF6B1A', transition: 'stroke 0.3s' }}>{icon.props.children}</svg>
      </div>
      <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1A0D00', marginBottom: '0.6rem' }}>{title}</div>
      <p style={{ fontSize: '0.85rem', color: '#5C3D20', lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
    </div>
  );
}

/* ── STORY ── */
function Story() {
  return (
    <section id="story" style={{ padding: '8rem 5vw', background: '#FFF3E8', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,26,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', alignItems: 'start' }}>
        <div>
          <div className="reveal"><SectionLabel>Notre ADN</SectionLabel></div>
          <h2 className="reveal" style={h2Style}>L'histoire de<br /><em style={emStyle}>deux amis</em></h2>
          <div className="reveal" style={{ fontSize: '0.97rem', color: '#5C3D20', lineHeight: 1.85, fontWeight: 300, marginTop: '1.5rem' }}>
            <p>Tout a commencé sur les bancs de nos grandes écoles respectives. Deux passionnés, deux visions complémentaires, une seule ambition : offrir aux particuliers et aux entrepreneurs l'excellence digitale habituellement réservée aux grands groupes.</p>
            <p style={{ marginTop: '1.2rem' }}>L'un apporte la rigueur de l'ingénierie — architecture solide, code propre, performances optimales. L'autre, la vision stratégique du business — positionnement, conversions, retour sur investissement. Ensemble, Tonel est né.</p>
            <p style={{ marginTop: '1.2rem' }}>Nous croyons que chaque projet mérite une attention totale. Pas de template préconçu, pas de solution générique. Seulement du sur-mesure, pensé et réalisé avec passion.</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '4.5rem' }}>
          {[
            { initial: 'A', name: 'Axel', role: 'Co-fondateur · Technique', desc: "Élève-ingénieur passionné de développement web et d'architecture logicielle. Il traduit chaque idée en code performant et maintenable, avec une obsession pour les détails techniques qui font la différence.", badge: "École d'Ingénieur" },
            { initial: 'T', name: 'Tony', role: 'Co-fondateur · Stratégie', desc: "Étudiant en école de commerce avec un œil acéré pour le design et la stratégie digitale. Il structure chaque projet pour maximiser son impact business et son attrait visuel auprès des clients.", badge: 'École de Commerce' },
          ].map(({ initial, name, role, desc, badge }) => (
            <ProfileCard key={name} initial={initial} name={name} role={role} desc={desc} badge={badge} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ initial, name, role, desc, badge }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="reveal" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      background: '#fff', borderRadius: 16, padding: '2.2rem 2.5rem',
      border: `1px solid ${hover ? 'rgba(255,107,26,0.25)' : 'rgba(255,107,26,0.12)'}`,
      position: 'relative', overflow: 'hidden',
      transform: hover ? 'translateY(-5px)' : 'none',
      boxShadow: hover ? '0 20px 60px rgba(255,107,26,0.15)' : 'none',
      transition: 'all 0.35s',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#FF6B1A,#FFB347)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.2rem' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#FF6B1A,#FFB347)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>{initial}</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', fontWeight: 700, color: '#1A0D00' }}>{name}</div>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FF6B1A', fontWeight: 600, marginTop: '0.15rem' }}>{role}</div>
        </div>
      </div>
      <p style={{ fontSize: '0.87rem', color: '#5C3D20', lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
      <div style={{ display: 'inline-block', marginTop: '1rem', padding: '0.3rem 1rem', background: 'linear-gradient(135deg,rgba(255,107,26,0.1),rgba(255,179,71,0.08))', border: '1px solid rgba(255,107,26,0.2)', borderRadius: 100, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF6B1A', fontWeight: 600 }}>{badge}</div>
    </div>
  );
}

/* ── DEVIS ── */
function Devis() {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', tel: '', type: '', budget: '', desc: '' });
  const [sent, setSent] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = { width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,107,26,0.2)', color: '#080808', fontFamily: "'Outfit',sans-serif", fontSize: '0.88rem', fontWeight: 300, outline: 'none', borderRadius: 8, transition: 'all 0.2s' };

  return (
    <section id="devis" style={{ padding: '8rem 5vw', background: '#fff' }}>
      <div className="reveal"><SectionLabel light>Gratuit & sans engagement</SectionLabel></div>
      <h2 className="reveal" style={{ ...h2Style, color: '#1A0D00' }}>Votre devis<br /><em style={emStyle}>personnalisé</em></h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw', alignItems: 'start', marginTop: '4rem' }}>
        <div className="reveal">
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.9rem', fontWeight: 700, color: '#1A0D00', marginBottom: '1rem' }}>Parlons de votre projet</h3>
          <p style={{ fontSize: '0.92rem', color: '#5C3D20', lineHeight: 1.8, fontWeight: 300, marginBottom: '2.5rem' }}>Décrivez-nous votre vision et recevez une proposition détaillée dans les 48h.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[['⚡','Réponse sous 24h','Nous analysons chaque demande avec sérieux'],['🔓','100% gratuit & sans engagement','Aucune condition, aucune surprise cachée'],['📋','Estimation détaillée','Budget, délais et périmètre clairement définis'],['📞','Appel de découverte offert','30 minutes pour aligner nos visions']].map(([icon,title,sub]) => (
              <DevisFeat key={title} icon={icon} title={title} sub={sub} />
            ))}
          </div>
        </div>
        <div className="reveal" style={{ background: '#120D1F', padding: '3rem', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#FF6B1A,#FFB347,#FF8C42)' }} />
          <div style={{ position: 'absolute', bottom: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,26,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
          {sent ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 68, height: 68, background: 'linear-gradient(135deg,#FF6B1A,#FFB347)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28, stroke: '#120D1F' }}><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>Demande envoyée !</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,248,242,0.6)', fontWeight: 300 }}>Merci pour votre confiance. Nous vous contacterons sous 24h pour échanger sur votre projet.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                <FormField label="Prénom *" input={<input style={inputStyle} placeholder="Jean" value={form.prenom} onChange={set('prenom')} required onFocus={e => e.target.style.borderColor='#FF6B1A'} onBlur={e => e.target.style.borderColor='rgba(255,107,26,0.2)'} />} />
                <FormField label="Nom *" input={<input style={inputStyle} placeholder="Dupont" value={form.nom} onChange={set('nom')} required onFocus={e => e.target.style.borderColor='#FF6B1A'} onBlur={e => e.target.style.borderColor='rgba(255,107,26,0.2)'} />} />
              </div>
              <FormField label="Email *" input={<input style={inputStyle} type="email" placeholder="jean@email.com" value={form.email} onChange={set('email')} required onFocus={e => e.target.style.borderColor='#FF6B1A'} onBlur={e => e.target.style.borderColor='rgba(255,107,26,0.2)'} />} />
              <FormField label="Téléphone" input={<input style={inputStyle} type="tel" placeholder="06 XX XX XX XX" value={form.tel} onChange={set('tel')} onFocus={e => e.target.style.borderColor='#FF6B1A'} onBlur={e => e.target.style.borderColor='rgba(255,107,26,0.2)'} />} />
              <FormField label="Type de projet *" input={
                <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }} value={form.type} onChange={set('type')} required onFocus={e => e.target.style.borderColor='#FF6B1A'} onBlur={e => e.target.style.borderColor='rgba(255,107,26,0.2)'}>
                  <option value="">Sélectionner...</option>
                  <option>Site vitrine restaurant</option>
                  <option>Site vitrine commerce / loisirs</option>
                  <option>Portfolio créatif</option>
                  <option>Landing page</option>
                  <option>Site vitrine personnel</option>
                  <option>Autre</option>
                </select>
              } />
              <FormField label="Budget estimé" input={
                <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }} value={form.budget} onChange={set('budget')} onFocus={e => e.target.style.borderColor='#FF6B1A'} onBlur={e => e.target.style.borderColor='rgba(255,107,26,0.2)'}>
                  <option value="">Je ne sais pas encore</option>
                  <option>Moins de 500€</option>
                  <option>500€ – 1 000€</option>
                  <option>1 000€ – 2 500€</option>
                  <option>Plus de 2 500€</option>
                </select>
              } />
              <FormField label="Description du projet *" input={<textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }} placeholder="Décrivez votre projet..." value={form.desc} onChange={set('desc')} required onFocus={e => e.target.style.borderColor='#FF6B1A'} onBlur={e => e.target.style.borderColor='rgba(255,107,26,0.2)'} />} />
              <button type="submit" style={{ width: '100%', padding: '1rem 2rem', background: 'linear-gradient(135deg,#FF6B1A,#FFB347)', color: '#120D1F', border: 'none', fontFamily: "'Outfit',sans-serif", fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', borderRadius: 100, transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(255,107,26,0.5)'; }} onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>Envoyer ma demande de devis →</button>
              <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'rgba(255,248,242,0.3)', fontWeight: 300 }}>🔒 Vos données sont confidentielles et ne sont jamais revendues</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FormField({ label, input }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,248,242,0.5)', marginBottom: '0.45rem', fontWeight: 500 }}>{label}</label>
      {input}
    </div>
  );
}

function DevisFeat({ icon, title, sub }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.1rem 1.4rem', background: hover ? 'rgba(255,107,26,0.05)' : '#FFF3E8', borderRadius: 12, border: `1px solid ${hover ? 'rgba(255,107,26,0.25)' : 'rgba(255,107,26,0.1)'}`, transform: hover ? 'translateX(5px)' : 'none', transition: 'all 0.25s' }}>
      <div style={{ width: 34, height: 34, flexShrink: 0, background: 'linear-gradient(135deg,#FF6B1A,#FFB347)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{icon}</div>
      <div>
        <strong style={{ display: 'block', fontSize: '0.87rem', fontWeight: 600, color: '#1A0D00', marginBottom: '0.15rem' }}>{title}</strong>
        <span style={{ fontSize: '0.78rem', color: '#5C3D20', fontWeight: 300 }}>{sub}</span>
      </div>
    </div>
  );
}

/* ── CONTACT ── */
function Contact() {
  return (
    <section id="contact" style={{ padding: '8rem 5vw', background: '#FFF3E8' }}>
      <div className="reveal"><SectionLabel>Nous joindre</SectionLabel></div>
      <h2 className="reveal" style={h2Style}>Restons en<br /><em style={emStyle}>contact</em></h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,420px))', gap: '1.5rem', marginTop: '4rem', justifyContent: 'center' }}>
        <ContactCard href="mailto:contact.tonel@gmail.com" label="Email" val="contact.tonel@gmail.com" sub="Réponse sous 24h" icon={<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>} />
        <ContactCard href="tel:0663884560" label="Téléphone" val="06 63 88 45 60" sub="Lun – Ven, 9h – 18h" icon={<svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.13 6.13l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>} />
      </div>
    </section>
  );
}

function ContactCard({ href, label, val, sub, icon }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="reveal" style={{ display: 'block', background: hover ? 'linear-gradient(135deg,#FF6B1A,#FFB347)' : '#fff', borderRadius: 20, padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(255,107,26,0.1)', transition: 'all 0.35s', transform: hover ? 'translateY(-6px)' : 'none', boxShadow: hover ? '0 20px 60px rgba(255,107,26,0.18)' : 'none', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: 56, height: 56, background: hover ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg,rgba(255,107,26,0.1),rgba(255,179,71,0.08))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', transition: 'background 0.35s' }}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24, stroke: hover ? '#fff' : '#FF6B1A', transition: 'stroke 0.35s' }}>{icon.props.children}</svg>
      </div>
      <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: hover ? 'rgba(255,255,255,0.65)' : '#9C7050', marginBottom: '0.5rem', fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.25rem', fontWeight: 700, color: hover ? '#fff' : '#FF6B1A', WebkitTextFillColor: hover ? '#fff' : undefined, display: 'block', marginBottom: '0.3rem', transition: 'all 0.35s' }}>{val}</div>
      <div style={{ fontSize: '0.78rem', color: hover ? 'rgba(255,255,255,0.55)' : '#9C7050', fontWeight: 300 }}>{sub}</div>
    </a>
  );
}

/* ── FOOTER ── */
function Footer() {
  const scroll = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <footer style={{ background: '#120D1F', padding: '4rem 5vw 2.5rem', borderTop: '1px solid rgba(255,107,26,0.15)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 100%,rgba(255,107,26,0.08) 0%,transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <div>
          <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.1rem', fontWeight: 700, color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '0.8rem' }}>T<span style={{ background: 'linear-gradient(135deg,#FF6B1A,#FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.</span>onel</a>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,248,242,0.35)', fontStyle: 'italic', fontFamily: "'Playfair Display',serif" }}>L'excellence digitale, à votre portée.</div>
        </div>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {[['services','Services'],['story','Histoire'],['devis','Devis'],['contact','Contact']].map(([id,label]) => (
            <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scroll(id); }} style={{ fontSize: '0.75rem', color: 'rgba(255,248,242,0.4)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 400, padding: '0.4rem 0.9rem', border: '1px solid rgba(255,107,26,0.15)', borderRadius: 100, transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.color='#FFB347'; e.target.style.borderColor='rgba(255,107,26,0.4)'; e.target.style.background='rgba(255,107,26,0.06)'; }} onMouseLeave={e => { e.target.style.color='rgba(255,248,242,0.4)'; e.target.style.borderColor='rgba(255,107,26,0.15)'; e.target.style.background='transparent'; }}>{label}</a>
          ))}
        </nav>
      </div>
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,248,242,0.18)' }}>© 2025 <strong style={{ color: '#FFB347' }}>Tonel</strong> — Tous droits réservés · Mentions légales · Politique de confidentialité</div>
      </div>
    </footer>
  );
}

/* ── SHARED ── */
const h2Style = { fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.5rem,4.5vw,4.2rem)', fontWeight: 700, lineHeight: 1.1, color: '#1A0D00', letterSpacing: '-0.02em' };
const emStyle = { fontStyle: 'italic', fontWeight: 400, background: 'linear-gradient(135deg,#FF6B1A,#FFB347)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#FF6B1A', fontWeight: 600, marginBottom: '1.2rem' }}>
      <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg,#FF6B1A,#FFB347)', borderRadius: 2 }} />
      {children}
    </div>
  );
}

/* ── GLOBAL CSS ── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { font-family: 'Outfit', sans-serif; color: #1A0D00; background: #FFF8F2; -webkit-font-smoothing: antialiased; }
  ::selection { background: #FFB347; color: #120D1F; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: #FF6B1A; }
  @keyframes raysRotate { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
  @keyframes floatOrb { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.08); } }
  @keyframes horizonPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scrollDown { 0%,100% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;

/* ── APP ── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showFloat, setShowFloat] = useState(false);
  useReveal();

  useEffect(() => {
    // Inject global CSS
    const style = document.createElement('style');
    style.textContent = globalCSS;
    document.head.appendChild(style);

    const fn = () => { setScrolled(window.scrollY > 60); setShowFloat(window.scrollY > 400); };
    window.addEventListener('scroll', fn);
    return () => { window.removeEventListener('scroll', fn); document.head.removeChild(style); };
  }, []);

  return (
    <>
      <Nav scrolled={scrolled} showFloat={showFloat} />
      <Hero />
      <Services />
      <Story />
      <Devis />
      <Contact />
      <Footer />
    </>
  );
}
