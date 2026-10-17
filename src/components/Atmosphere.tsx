import { useEffect, useRef, useState } from 'react';

export function Atmosphere() {
  const [scene, setScene] = useState('hero');
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frame.current = null;
      const sections = ['home', 'about', 'projects', 'journey', 'github', 'terminal', 'contact'];
      const current = sections
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .map((section) => ({ id: section.id, distance: Math.abs(section.getBoundingClientRect().top - window.innerHeight * 0.35) }))
        .sort((first, second) => first.distance - second.distance)[0];
      if (current) setScene(current.id);
    };

    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };

    const onScroll = () => {
      if (frame.current === null) frame.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div className="atmosphere" data-scene={scene} aria-hidden="true">
      <div className="atmosphere__spotlight" />
      <div className="atmosphere__orb atmosphere__orb--one" />
      <div className="atmosphere__orb atmosphere__orb--two" />
      <div className="atmosphere__grid" />
      <div className="atmosphere__grain" />
    </div>
  );
}
