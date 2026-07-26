type IconProps = {
  name: string;
  className?: string;
};

const icons: Record<string, string> = {
  arrow: "M5 12h14M13 5l7 7-7 7",
  brush: "M17 3l4 4-11 11H6v-4L17 3z M4 21c2 0 3-1 3-3",
  check: "M20 6 9 17l-5-5",
  clipboard: "M9 5h6M9 3h6v4H9z M6 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1",
  hardhat: "M2 18h20M4 18v-2a8 8 0 0 1 16 0v2M9 10V6m6 4V6",
  headset: "M4 13a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-2M4 13v4a3 3 0 0 0 3 3h1M8 13v6m8-6v6",
  image: "M4 5h16v14H4z M8 13l3-3 4 5 2-2 3 4 M8 8h.01",
  lightbulb: "M9 18h6M10 22h4M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 4H9c0-2 0-3-1-4z",
  mail: "M4 6h16v12H4z M4 7l8 6 8-6",
  map: "M12 21s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11z M12 10h.01",
  menu: "M4 6h16M4 12h16M4 18h16",
  message: "M21 11.5a8.5 8.5 0 0 1-12.2 7.6L3 21l1.9-5.5A8.5 8.5 0 1 1 21 11.5z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z",
  play: "M8 5v14l11-7z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-5",
  star: "M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z",
  waves: "M2 15c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2M2 9c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2",
  x: "M6 6l12 12M18 6 6 18"
};

export function Icon({ name, className = "" }: IconProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill={name === "star" || name === "play" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}
