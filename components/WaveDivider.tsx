export function WaveDivider() {
  return (
    <div className="relative -mt-24 h-32 overflow-hidden bg-transparent" aria-hidden="true">
      <svg className="absolute bottom-0 h-full w-[120%] text-white" viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ animation: "waveSlide 8s ease-in-out infinite" }}>
        <path fill="currentColor" d="M0,96 C210,154 315,31 520,80 C725,129 815,162 1016,103 C1217,44 1304,67 1440,95 L1440,160 L0,160 Z" />
      </svg>
      <svg className="absolute bottom-2 h-full w-[120%] text-aqua-300/55" viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ animation: "waveSlide 10s ease-in-out infinite reverse" }}>
        <path fill="currentColor" d="M0,110 C222,146 325,69 520,91 C723,114 831,137 1037,91 C1242,45 1330,68 1440,104 L1440,160 L0,160 Z" />
      </svg>
    </div>
  );
}
