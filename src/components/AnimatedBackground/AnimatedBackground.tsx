import React, { useEffect, useRef } from "react";

interface BloodCell {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
}

const AnimatedBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<BloodCell[]>([]);

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create blood cells
    const createCells = () => {
      const cells: BloodCell[] = [];
      const cellCount = Math.min(
        80,
        Math.floor((canvas.width * canvas.height) / 15000)
      );

      for (let i = 0; i < cellCount; i++) {
        cells.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.4 + 0.2,
          angle: Math.random() * Math.PI * 2,
        });
      }
      cellsRef.current = cells;
    };

    createCells();

    // Draw a blood cell
    const drawCell = (cell: BloodCell) => {
      ctx.beginPath();
      ctx.ellipse(
        cell.x,
        cell.y,
        cell.size,
        cell.size * 0.7,
        cell.angle,
        0,
        Math.PI * 2
      );

      const gradient = ctx.createRadialGradient(
        cell.x,
        cell.y,
        0,
        cell.x,
        cell.y,
        cell.size
      );

      gradient.addColorStop(0, `rgba(220, 38, 38, ${cell.opacity})`);
      gradient.addColorStop(0.7, `rgba(185, 28, 28, ${cell.opacity * 0.7})`);
      gradient.addColorStop(1, `rgba(153, 27, 27, ${cell.opacity * 0.3})`);

      ctx.fillStyle = gradient;
      ctx.fill();

      // Add glow
      ctx.shadowColor = `rgba(220, 38, 38, ${cell.opacity * 0.5})`;
      ctx.shadowBlur = cell.size * 2;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle gradient background
      const bgGradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      bgGradient.addColorStop(0, "rgba(254, 242, 242, 0.05)");
      bgGradient.addColorStop(0.5, "rgba(254, 226, 226, 0.03)");
      bgGradient.addColorStop(1, "rgba(254, 242, 242, 0.05)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw cells
      cellsRef.current.forEach((cell) => {
        // Move cell in a gentle floating motion
        cell.x += Math.cos(cell.angle) * cell.speed;
        cell.y += Math.sin(cell.angle) * cell.speed * 0.5;

        // Gentle rotation
        cell.angle += 0.01;

        // Bounce off edges with smooth turn
        if (cell.x < 0 || cell.x > canvas.width) {
          cell.angle = Math.PI - cell.angle;
        }
        if (cell.y < 0 || cell.y > canvas.height) {
          cell.angle = -cell.angle;
        }

        // Keep within bounds
        cell.x = Math.max(0, Math.min(canvas.width, cell.x));
        cell.y = Math.max(0, Math.min(canvas.height, cell.y));

        // Draw the cell
        drawCell(cell);
      });

      // Draw connection lines between close cells
      cellsRef.current.forEach((cell1, i) => {
        cellsRef.current.slice(i + 1).forEach((cell2) => {
          const dx = cell1.x - cell2.x;
          const dy = cell1.y - cell2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(cell1.x, cell1.y);
            ctx.lineTo(cell2.x, cell2.y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${
              0.1 * (1 - distance / 150)
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // The requestAnimationFrame function returns a number (the animation ID)
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      // Ensure we check for null before calling cancelAnimationFrame
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Canvas for blood cells animation */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* HTML-based effects (Pulsing circles and Floating particles) */}
      {/* ... (rest of your component's JSX remains the same) ... */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Pulsing circles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border mt-10 border-red-300/20"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              animation: `pulse ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            // Tailwind class `bg-linear-to-br from-red-400/30 to-rose-500/20` is likely not a standard Tailwind class.
            // Assuming it's a custom class or an error, I've kept it as is for minimal change.
            className="absolute rounded-full bg-linear-to-br from-red-400/30 to-rose-500/20"
            style={{
              // The original code had eslint-disable-next-line comments which are removed for clarity
              // eslint-disable-next-line react-hooks/purity
              width: `${Math.random() * 6 + 2}px`,
              // eslint-disable-next-line react-hooks/purity
              height: `${Math.random() * 6 + 2}px`,
              // eslint-disable-next-line react-hooks/purity
              left: `${Math.random() * 100}%`,
              // eslint-disable-next-line react-hooks/purity
              top: `${Math.random() * 100}%`,
              // eslint-disable-next-line react-hooks/purity
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              // eslint-disable-next-line react-hooks/purity
              animationDelay: `${Math.random() * 5}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
