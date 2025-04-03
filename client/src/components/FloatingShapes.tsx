
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'square' | 'circle';
  duration: number;
  delay: number;
}

const FloatingShapes: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { showShapes } = useTheme();
  const isDesktop = !useIsMobile();

  // Function to check if a new position overlaps with existing shapes
  const checkOverlap = (x: number, y: number, size: number) => {
    const margin = size * 0.75; // Increased margin to prevent overlap
    return shapes.some(shape => {
      const dx = Math.abs(shape.x - x);
      const dy = Math.abs(shape.y - y);
      return dx < (shape.size + size) / 2 + margin && dy < (shape.size + size) / 2 + margin;
    });
  };

  useEffect(() => {
    setIsMounted(true);
    const numberOfShapes = isDesktop ? 6 : 4;
    const newShapes: Shape[] = [];

    for (let i = 0; i < numberOfShapes; i++) {
      let x: number, y: number, size: number;
      let attempts = 0;

      do {
        // Leave some margin from edges (5% on each side)
        x = Math.random() * 90 + 5;
        y = Math.random() * 90 + 5;
        size = isDesktop ? (Math.random() * 60 + 120) : (Math.random() * 40 + 70); // Larger sizes for desktop
        attempts++;
      } while (checkOverlap(x, y, size) && attempts < 100);

      if (attempts < 100) {
        newShapes.push({
          id: i,
          x,
          y,
          size,
          type: Math.random() > 0.5 ? 'square' : 'circle',
          duration: Math.random() * 2 + 3,
          delay: Math.random() * 2
        });
      }
    }

    setShapes(newShapes);
  }, [isDesktop]);

  if (!isMounted || !showShapes) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden">
      {shapes.map(shape => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.type === 'circle' ? 'rounded-full' : 'rounded-3xl'} bg-primary/5`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            scale: 0.95
          }}
          animate={{ 
            x: [0, (Math.random() > 0.5 ? 25 : -25)],
            y: [0, (Math.random() > 0.5 ? 25 : -25)],
            rotate: [0, (Math.random() > 0.5 ? 8 : -8)],
            scale: [0.92, 1.05, 0.92]
          }}
          transition={{
            duration: shape.duration * 0.7, // Faster animation
            delay: shape.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
