import { useState, useEffect, MutableRefObject } from 'react';

function isClient(): boolean {
  return typeof window === 'object';
}

function isFullScreenElement(el: HTMLElement | MutableRefObject<HTMLElement | null>): boolean {
  if (el && 'current' in el && el.current) {
    return Boolean(
      document.fullscreenElement === el.current ||
        (document as any).mozFullScreenElement === el.current ||
        (document as any).webkitFullscreenElement === el.current ||
        (document as any).msFullscreenElement === el.current,
    );
  }

  return Boolean(
    document.fullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement ||
      (document as any).fullscreen ||
      (document as any).mozFullScreen ||
      (document as any).webkitIsFullScreen ||
      (document as any).fullScreenMode,
  );
}

interface FullScreenMethods {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

function useFullScreen(element: MutableRefObject<HTMLElement | null>): { fullScreen: boolean } & FullScreenMethods {
  const initialState = !isClient() ? false : isFullScreenElement(element);
  const [fullScreen, setFullScreen] = useState<boolean>(initialState);

  // Access various open fullscreen methods
  function openFullScreen() {
    const el = element.current || document.documentElement;

    if (el.requestFullscreen) return el.requestFullscreen();
    if ((el as any).mozRequestFullScreen) return (el as any).mozRequestFullScreen();
    if ((el as any).webkitRequestFullscreen) return (el as any).webkitRequestFullscreen();
    if ((el as any).msRequestFullscreen) return (el as any).msRequestFullscreen();
  }

  // Access various exit fullscreen methods
  function closeFullScreen() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if ((document as any).mozCancelFullScreen) return (document as any).mozCancelFullScreen();
    if ((document as any).webkitExitFullscreen) return (document as any).webkitExitFullscreen();
    if ((document as any).msExitFullscreen) return (document as any).msExitFullscreen();
  }

  // Toggle fullscreen mode
  function toggleFullScreen() {
    if (isFullScreenElement(element)) {
      closeFullScreen();
    } else {
      openFullScreen();
    }
  }

  useEffect(() => {
    function handleChange() {
      setFullScreen(isFullScreenElement(element));
    }

    document.addEventListener('webkitfullscreenchange', handleChange, false);
    document.addEventListener('mozfullscreenchange', handleChange, false);
    document.addEventListener('msfullscreenchange', handleChange, false);
    document.addEventListener('MSFullscreenChange', handleChange, false);
    document.addEventListener('fullscreenchange', handleChange, false);

    return () => {
      document.removeEventListener('webkitfullscreenchange', handleChange);
      document.removeEventListener('mozfullscreenchange', handleChange);
      document.removeEventListener('msfullscreenchange', handleChange);
      document.removeEventListener('MSFullscreenChange', handleChange);
      document.removeEventListener('fullscreenchange', handleChange);
    };
  }, [element]);

  return {
    fullScreen,
    open: openFullScreen,
    close: closeFullScreen,
    toggle: toggleFullScreen,
  };
}

export default useFullScreen;
