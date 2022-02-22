export const injectGithub = (() => {
  // Create an IIFE so that we can retain whether we've injected the GH
  // script at all.
  let injected = false;

  return () => {
    if (injected) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://buttons.github.io/buttons.js';
    document.body.appendChild(script);
  };
})();
