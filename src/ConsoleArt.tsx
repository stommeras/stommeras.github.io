'use client';

import { useEffect } from 'react';

const ASCII_ART = `

╔══════════════════════════════════════════════╗
║                                              ║
║              Welcome, developer!             ║
║                                              ║
║        Website designed and created by       ║
║               Steffen Tømmerås               ║
║                                              ║
║         Check out the source code at:        ║
║   github.com/stommeras/stommeras.github.io   ║
║                                              ║
╚══════════════════════════════════════════════╝

`;

export function ConsoleArt() {
  useEffect(() => {
    console.log(ASCII_ART);
  }, []);

  return null;
}
