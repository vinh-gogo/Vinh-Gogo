export default function handler(req, res) {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 's-maxage=86400');

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9d78eb"/>
      <stop offset="60%" stop-color="#b8a1f2"/>
      <stop offset="100%" stop-color="#e2d6fa"/>
    </radialGradient>

    <radialGradient id="sclera" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f4f4f4"/>
      <stop offset="100%" stop-color="#d4c8eb"/>
    </radialGradient>

    <radialGradient id="iris" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#4adede"/>
      <stop offset="40%" stop-color="#14528c"/>
      <stop offset="80%" stop-color="#0a1930"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <circle cx="200" cy="200" r="190" fill="url(#bg)" stroke="none">
    <animate attributeName="r" values="190;196;190" dur="4s" ease="ease-in-out" repeatCount="indefinite"/>
  </circle>

  <ellipse cx="200" cy="200" rx="120" ry="72" fill="url(#sclera)" stroke="#3a2e5d" stroke-width="4" filter="url(#shadow)"/>

  <g>
    <animateTransform 
      attributeName="transform" 
      type="translate" 
      values="0,0; 15,-5; 15,-5; -10,8; -10,8; 0,0" 
      keyTimes="0; 0.15; 0.4; 0.55; 0.8; 1" 
      calcMode="spline" 
      keySplines="0.4 0 0.2 1; 1 0 1 1; 0.4 0 0.2 1; 1 0 1 1; 0.4 0 0.2 1" 
      dur="7s" 
      repeatCount="indefinite"
    />
    
    <circle cx="200" cy="200" r="42" fill="url(#iris)"/>
    
    <circle cx="200" cy="200" r="14" fill="#000">
      <animate attributeName="r" values="14;16;14;12;14" dur="5s" repeatCount="indefinite"/>
    </circle>

    <circle cx="185" cy="185" r="8" fill="#ffffff" opacity="0.9"/>
    <circle cx="208" cy="212" r="3" fill="#ffffff" opacity="0.6"/>
  </g>

  <path fill="#2c224a" stroke="#160e29" stroke-width="2" filter="url(#shadow)"
        d="M60 164C60 164 118 118 200 118C282 118 340 164 340 164V200H60V164Z">
    <animate attributeName="d"
      values="M60 164C60 164 118 118 200 118C282 118 340 164 340 164V200H60V164Z;
              M60 200C60 200 118 210 200 210C282 210 340 200 340 200V200H60V200Z;
              M60 164C60 164 118 118 200 118C282 118 340 164 340 164V200H60V164Z"
      keyTimes="0;0.05;0.1"
      dur="6s" 
      repeatCount="indefinite"/>
  </path>

  <path fill="#2c224a" stroke="#160e29" stroke-width="2" 
        d="M60 236C60 236 118 282 200 282C282 282 340 236 340 236V200H60V236Z"/>
</svg>`;

  res.status(200).send(svg);
}
