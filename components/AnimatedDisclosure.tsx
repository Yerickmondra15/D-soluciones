"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export function AnimatedDisclosure({ title, children, className, heading = false }: {
  title: string;
  children: ReactNode;
  className?: string;
  heading?: boolean;
}) {
  const id = useId();
  const details = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const reduce = useReducedMotion();
  const animatedHeight = useMotionValue(0);
  const opacity = useMotionValue(1);
  const y = useMotionValue(0);
  const rotation = useMotionValue(0);

  useEffect(() => {
    setExpanded(details.current?.open ?? false);
    setEnhanced(true);
    const body = content.current;
    if (!body) return;
    // Closed details skip layout; keep the last natural height for the next opening.
    const measure = () => {
      const next = body.getBoundingClientRect().height;
      if (next > 0) setHeight(next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    const controls = [
      animate(animatedHeight, expanded ? height : 0, {
        duration: reduce ? 0 : .34, ease: [.22, 1, .36, 1],
        onComplete: () => { if (!expanded) setClosing(false); }
      }),
      animate(opacity, expanded ? 1 : 0, { duration: reduce ? 0 : .22 }),
      animate(y, expanded || reduce ? 0 : -6, { duration: reduce ? 0 : .22 }),
      animate(rotation, expanded ? 45 : 0, { duration: reduce ? 0 : .25 })
    ];
    return () => controls.forEach(control => control.stop());
  }, [enhanced, expanded, height, reduce, animatedHeight, opacity, y, rotation]);

  return <details ref={details} className={className} open={enhanced ? expanded || closing : undefined} data-expanded={expanded}>
    <summary id={`${id}-trigger`} aria-expanded={enhanced ? expanded : undefined} aria-controls={`${id}-panel`}
      onClick={event => {
        if (!enhanced) return;
        event.preventDefault();
        setClosing(expanded);
        setExpanded(!expanded);
      }}>
      {heading ? <h3>{title}</h3> : <span>{title}</span>}
      <motion.span className="disclosure-icon" style={{ rotate: rotation }} aria-hidden="true"><Plus size={20} /></motion.span>
    </summary>
    <motion.div id={`${id}-panel`} className="disclosure-panel" aria-labelledby={`${id}-trigger`}
      inert={enhanced && !expanded}
      style={enhanced ? { height: animatedHeight } : undefined}>
      <motion.div ref={content} className="disclosure-content" style={enhanced ? { opacity, y } : undefined}>
        {children}
      </motion.div>
    </motion.div>
  </details>;
}
