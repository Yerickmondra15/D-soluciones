"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { VIDEOS } from "@/data/site";

export function VideoShowcase() {
  const [playing, setPlaying] = useState<number | null>(null);
  return <section className="section video-section">
    <div className="container">
      <div className="section-intro"><div><p className="eyebrow">EN CAMPO</p><h2>El trabajo, <span>de cerca.</span></h2></div><p>Instalaciones, procesos y detalles de nuestros servicios en proyectos reales.</p></div>
      <div className="video-grid">
        {VIDEOS.map((video, index) => <article key={video.src} className="video-card">
          <div className="video-box">
            {playing === index
              ? <video src={video.src} poster={video.poster} controls playsInline autoPlay preload="metadata" aria-label={video.title} />
              : <button type="button" onClick={() => setPlaying(index)} aria-label={`Reproducir ${video.title}`}>
                  <Image src={video.poster} fill alt={`Vista previa: ${video.title}`} sizes="(max-width: 680px) 95vw, 33vw" />
                  <span className="play-circle" aria-hidden="true"><Play size={24} fill="currentColor" /></span>
                </button>}
          </div>
          <div className="video-info"><h3>{video.title}</h3><p>{video.subtitle}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}
