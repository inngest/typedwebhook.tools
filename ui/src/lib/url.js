import { derived, writable } from 'svelte/store';

export function createUrlStore(ssrUrl) {
  // Ideally a bundler constant so that it's tree-shakable
  if (typeof window === 'undefined') {
    const { subscribe } = writable(ssrUrl);
    return { subscribe };
  }

  const href = writable(window.location.href);

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  const updateHref = () => href.set(window.location.href);

  history.pushState = function () {
    originalPushState.apply(this, arguments);
    updateHref();
  };

  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    updateHref();
  };

  window.addEventListener('popstate', updateHref);
  window.addEventListener('hashchange', updateHref);

  return {
    subscribe: derived(href, ($href) => new URL($href)).subscribe
  };
}

export default createUrlStore();
