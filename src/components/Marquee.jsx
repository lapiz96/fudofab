export default function Marquee() {
  const items = [
    'Web Design', 'Development', 'Graphic Design', 'Video Editing',
    'UI/UX', 'Branding', 'Motion Design', 'Digital Strategy',
    'Web Design', 'Development', 'Graphic Design', 'Video Editing',
    'UI/UX', 'Branding', 'Motion Design', 'Digital Strategy',
  ];

  return (
    <div className="marquee-section" id="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}
