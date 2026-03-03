import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type FrameId = 1 | 2 | 3 | "replay";

// Static particle indices — order never changes
const PARTICLE_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// ─── Particle component ───────────────────────────────────────────────────────
function GoldParticle({ index }: { index: number }) {
  const size = 2 + (index % 4);
  const left = 5 + ((index * 13.7) % 90);
  const delay = (index * 0.7) % 4;
  const duration = 6 + ((index * 1.3) % 6);

  return (
    <div
      style={{
        position: "absolute",
        left: `${left}%`,
        bottom: "-10px",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: "#d4af37",
        opacity: 0.4 + (index % 3) * 0.15,
        animation: `floatUp ${duration}s ${delay}s infinite ease-in-out`,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Frame components ─────────────────────────────────────────────────────────

function Frame1({ visible }: { visible: boolean }) {
  return (
    <motion.div
      data-ocid="frame1.section"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Shimmer background overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          animation: "shimmerPulse 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "420px", width: "100%" }}>
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1.25rem",
            color: "#c9a84c",
            letterSpacing: "0.06em",
            marginBottom: "0.75rem",
          }}
        >
          A Grandmother&apos;s Blessing
        </motion.p>

        {/* Top divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: visible ? 1 : 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #f5f0e8, transparent)",
            marginBottom: "1.5rem",
          }}
        />

        {/* "Wedding Reception of" */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.85 : 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
            color: "#f5f0e8",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}
        >
          Wedding Reception of
        </motion.p>

        {/* Groom name */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 6vw, 2.6rem)",
            fontWeight: 600,
            color: "#e2c15a",
            letterSpacing: "0.03em",
            lineHeight: 1.15,
            marginBottom: "0.5rem",
          }}
        >
          Akshaay Hendricks
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.75 : 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "#c9a84c",
            letterSpacing: "0.04em",
            marginBottom: "1.5rem",
          }}
        >
          Son of Connell &amp; Meenakshi Hendricks
        </motion.p>

        {/* Ornamental separator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
          style={{
            fontSize: "1.4rem",
            color: "#f5f0e8",
            marginBottom: "1.5rem",
            letterSpacing: "0.4em",
          }}
        >
          ✦ ✦ ✦
        </motion.div>

        {/* Bride name */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 6vw, 2.6rem)",
            fontWeight: 600,
            color: "#e2c15a",
            letterSpacing: "0.03em",
            lineHeight: 1.15,
            marginBottom: "0.5rem",
          }}
        >
          Sheryl Dsouza
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.75 : 0 }}
          transition={{ delay: 2.5, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "#c9a84c",
            letterSpacing: "0.04em",
          }}
        >
          Daughter of Pascal &amp; Jane Dsouza &amp; Florine Dsouza
        </motion.p>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: visible ? 1 : 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #f5f0e8, transparent)",
            marginTop: "1.5rem",
          }}
        />
      </div>
    </motion.div>
  );
}

function Frame2({ visible }: { visible: boolean }) {
  return (
    <motion.div
      data-ocid="frame2.section"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Golden glow pulse */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 65%)",
          animation: "glowPulse 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "420px", width: "100%" }}>
        {/* Date */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 7vw, 3rem)",
            fontWeight: 600,
            color: "#e2c15a",
            letterSpacing: "0.04em",
            marginBottom: "0.25rem",
          }}
        >
          19th July 2026
        </motion.h2>

        {/* Day label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.7 : 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "#c9a84c",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Sunday
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: visible ? 1 : 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #f5f0e8, transparent)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Venue */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{ marginBottom: "0.4rem" }}
        >
          <span
            style={{
              fontSize: "1.4rem",
              marginRight: "0.4rem",
            }}
          >
            📍
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 4.5vw, 1.8rem)",
              color: "#e2c15a",
              fontWeight: 600,
              letterSpacing: "0.03em",
            }}
          >
            Beach Rotana
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.7 : 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "#c9a84c",
            letterSpacing: "0.06em",
            marginBottom: "1.75rem",
          }}
        >
          Abu Dhabi
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: visible ? 1 : 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #f5f0e8 30%, #f5f0e8 70%, transparent)",
            marginBottom: "1.75rem",
          }}
        />

        {/* Entry */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: visible ? 0.85 : 0, y: visible ? 0 : 6 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.15rem",
            color: "#f5f0e8",
            letterSpacing: "0.08em",
            marginBottom: "0.4rem",
          }}
        >
          Bride &amp; Bridegroom Entry
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ delay: 2.1, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 5.5vw, 2.4rem)",
            fontWeight: 600,
            color: "#e2c15a",
            letterSpacing: "0.06em",
            marginBottom: "1.75rem",
          }}
        >
          6:15 PM
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: visible ? 1 : 0 }}
          transition={{ delay: 2.4, duration: 0.5 }}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #f5f0e8, transparent)",
            marginBottom: "1.75rem",
          }}
        />

        {/* Dress Code */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.75 : 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "#c9a84c",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}
        >
          Dress Code
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
          transition={{ delay: 2.9, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.25rem, 4vw, 1.6rem)",
            color: "#e2c15a",
            letterSpacing: "0.05em",
            fontStyle: "italic",
          }}
        >
          Traditional or Indo-Western
        </motion.p>
      </div>
    </motion.div>
  );
}

function Frame3({ visible }: { visible: boolean }) {
  const lines = [
    { text: "From Mumbai roots…", delay: 0.4 },
    { text: "Mangalorean grace…", delay: 1.0 },
    { text: "A life in Abu Dhabi…", delay: 1.7 },
  ];

  const heartLines = [
    { text: "Two Hearts.", delay: 2.8 },
    { text: "One Destiny.", delay: 3.4 },
  ];

  return (
    <motion.div
      data-ocid="frame3.section"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        pointerEvents: visible ? "auto" : "none",
        overflow: "hidden",
      }}
    >
      {/* Floating particles */}
      {PARTICLE_INDICES.map((i) => (
        <GoldParticle key={i} index={i} />
      ))}

      {/* Candlelight glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 70% at 50% 80%, rgba(212,175,55,0.12) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "420px", width: "100%" }}>
        {/* Poetic lines */}
        {lines.map((line) => (
          <motion.p
            key={line.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
            transition={{ delay: line.delay, duration: 0.8 }}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
              color: "#c9a84c",
              letterSpacing: "0.04em",
              lineHeight: 1.6,
              marginBottom: "0.25rem",
            }}
          >
            {line.text}
          </motion.p>
        ))}

        {/* Small pause, then heart lines */}
        <div style={{ height: "1.5rem" }} />

        {heartLines.map((line) => (
          <motion.p
            key={line.text}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
            transition={{ delay: line.delay, duration: 0.9 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 5vw, 2.1rem)",
              fontWeight: 600,
              color: "#e2c15a",
              letterSpacing: "0.05em",
              lineHeight: 1.3,
              marginBottom: "0.15rem",
            }}
          >
            {line.text}
          </motion.p>
        ))}

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: visible ? 1 : 0 }}
          transition={{ delay: 4.2, duration: 0.6 }}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #f5f0e8, transparent)",
            margin: "2rem 0 1.5rem",
          }}
        />

        {/* Blessing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.8 : 0 }}
          transition={{ delay: 4.6, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "#f5f0e8",
            letterSpacing: "0.06em",
            marginBottom: "0.5rem",
          }}
        >
          With Blessings,
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
          transition={{ delay: 5.1, duration: 0.9 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            fontWeight: 600,
            color: "#e2c15a",
            letterSpacing: "0.06em",
          }}
        >
          Grandmother Chadha
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Replay Screen ─────────────────────────────────────────────────────────────
function ReplayScreen({
  visible,
  onReplay,
}: {
  visible: boolean;
  onReplay: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.92 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ textAlign: "center" }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: "#c9a84c",
            letterSpacing: "0.08em",
            marginBottom: "2rem",
          }}
        >
          With Love &amp; Blessings
        </p>

        <button
          type="button"
          data-ocid="replay.button"
          onClick={onReplay}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#e2c15a",
            background: "transparent",
            border: "1px solid #c9a84c",
            borderRadius: "2px",
            padding: "0.75rem 2.5rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(212,175,55,0.12)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#e2c15a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#c9a84c";
          }}
        >
          ↺ Replay
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentFrame, setCurrentFrame] = useState<FrameId>(1);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const startSequence = useCallback(() => {
    clearAllTimeouts();
    setCurrentFrame(1);

    const ids: ReturnType<typeof setTimeout>[] = [];
    // Frame 1: 10s, then crossfade to Frame 2
    ids.push(setTimeout(() => setCurrentFrame(2), 10_000));
    // Frame 2: 12s after frame 1 starts → 22s total
    ids.push(setTimeout(() => setCurrentFrame(3), 22_000));
    // Frame 3: 11s after frame 2 starts → 33s total
    ids.push(setTimeout(() => setCurrentFrame("replay"), 33_000));
    timeoutsRef.current = ids;
  }, [clearAllTimeouts]);

  useEffect(() => {
    startSequence();
    return clearAllTimeouts;
  }, [startSequence, clearAllTimeouts]);

  const handleReplay = () => {
    startSequence();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a3329",
        overflow: "hidden",
        fontFamily: "var(--font-display)",
      }}
    >
      {/* Ambient background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(13,59,46,0.9) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 80% 90%, rgba(6,40,30,0.8) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Subtle noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
          pointerEvents: "none",
        }}
      />

      {/* Corner ornaments */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          width: "50px",
          height: "50px",
          borderTop: "1px solid rgba(201,168,76,0.3)",
          borderLeft: "1px solid rgba(201,168,76,0.3)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          width: "50px",
          height: "50px",
          borderTop: "1px solid rgba(201,168,76,0.3)",
          borderRight: "1px solid rgba(201,168,76,0.3)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "1rem",
          width: "50px",
          height: "50px",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
          borderLeft: "1px solid rgba(201,168,76,0.3)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          width: "50px",
          height: "50px",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
          borderRight: "1px solid rgba(201,168,76,0.3)",
          pointerEvents: "none",
        }}
      />

      {/* Frames */}
      <AnimatePresence>
        <Frame1 visible={currentFrame === 1} />
        <Frame2 visible={currentFrame === 2} />
        <Frame3 visible={currentFrame === 3} />
        <ReplayScreen
          visible={currentFrame === "replay"}
          onReplay={handleReplay}
        />
      </AnimatePresence>
    </div>
  );
}
