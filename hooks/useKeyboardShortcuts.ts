import { useEffect } from "react";

interface ShortcutHandlers {
  onPlayPause: () => void;
  onVolumeUp: () => void;
  onVolumeDown: () => void;
  onSeekForward: () => void;
  onSeekBackward: () => void;
  onMute: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't fire when user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) return;

      switch (e.key) {
        case " ":
          e.preventDefault(); // Stop page scroll
          handlers.onPlayPause();
          break;
        case "ArrowUp":
          e.preventDefault();
          handlers.onVolumeUp();
          break;
        case "ArrowDown":
          e.preventDefault();
          handlers.onVolumeDown();
          break;
        case "ArrowRight":
          e.preventDefault();
          handlers.onSeekForward();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlers.onSeekBackward();
          break;
        case "m":
        case "M":
          handlers.onMute();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
}