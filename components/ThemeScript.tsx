import type { ThemeConfig } from "@/types/site";

/**
 * Анти-мигание темы: ставлю data-theme на <html> синхронно, до первого
 * рендера, чтобы светлая тема не мелькала перед тёмной (и наоборот).
 *
 * Если darkModeToggle выключен, localStorage вообще не трогаю —
 * рендерим сразу в defaultMode.
 */
export function ThemeScript({ theme }: { theme: ThemeConfig }) {
  const code = `(function(){try{var d=${JSON.stringify(theme.defaultMode)};var m=d;${
    theme.darkModeToggle
      ? 'var s=localStorage.getItem("theme");if(s==="light"||s==="dark"){m=s}'
      : ""
  }document.documentElement.setAttribute("data-theme",m);}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(
    theme.defaultMode,
  )});}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default ThemeScript;
