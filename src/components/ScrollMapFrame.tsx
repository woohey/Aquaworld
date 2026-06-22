import type { ReactNode } from 'react';

type ScrollMapFrameProps = {
  children: ReactNode;
};

export function ScrollMapFrame({ children }: ScrollMapFrameProps) {
  return (
    <section className="scroll-map-frame" aria-label="水域画卷图谱">
      <div className="scroll-map-frame__paper" aria-hidden="true" />
      <div className="scroll-map-frame__wash scroll-map-frame__wash--left" aria-hidden="true" />
      <div className="scroll-map-frame__wash scroll-map-frame__wash--right" aria-hidden="true" />
      <div className="scroll-map-frame__currents" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="scroll-map-frame__content">{children}</div>
    </section>
  );
}
