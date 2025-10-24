import type { Plugin } from 'vite';
import { COLOR_MODE_KEY, COLORS, INITIAL_COLOR_MODE_CSS_PROP } from '../src/constants';

export function themeScriptPlugin(): Plugin {
  return {
    name: 'theme-script',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const themeScript = `
          <script>
            (function() {
              const COLOR_MODE_KEY = "${COLOR_MODE_KEY}";
              const INITIAL_COLOR_MODE_CSS_PROP = "${INITIAL_COLOR_MODE_CSS_PROP}";
              const COLORS = ${JSON.stringify(COLORS)};

              const root = document.documentElement;
              let colorMode = root.style.getPropertyValue(INITIAL_COLOR_MODE_CSS_PROP);

              if (!colorMode) {
                const persistedPreference = localStorage.getItem(COLOR_MODE_KEY);
                if (persistedPreference) {
                  colorMode = persistedPreference;
                } else {
                  const mql = window.matchMedia("(prefers-color-scheme: dark)");
                  colorMode = mql.matches ? "dark" : "light";
                }
              }

              root.style.setProperty(INITIAL_COLOR_MODE_CSS_PROP, colorMode);

              Object.entries(COLORS).forEach(([name, colorByTheme]) => {
                const cssVarName = \`--color-\${name}\`;
                root.style.setProperty(cssVarName, colorByTheme[colorMode]);
              });

              document.addEventListener('DOMContentLoaded', function() {
                document.body.style.transition = "background 0.3s, color 0.3s";
              });
            })();
          </script>
        `;

        return html.replace('<head>', `<head>${themeScript}`);
      },
    },
  };
}