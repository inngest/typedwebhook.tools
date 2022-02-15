type FromJSON = (input: string) => string | object;
type ToTS = (input: string) => string;

declare global {
  interface Window {
    Go: any;
  }
}

let loaded = false;
export async function init(after?: () => any) {
  // only run once.
  if (loaded || !global.Go) return;

  const go = new global.Go();
  let result = await WebAssembly.instantiateStreaming(
    fetch("/wasm/types.wasm"),
    go.importObject
  );
  go.run(result.instance);

  if (after) {
    return after();
  }
}
