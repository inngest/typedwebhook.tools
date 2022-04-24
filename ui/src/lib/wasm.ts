type fromJSON = (input: string) => string | object;
type toTS = (input: string) => string;
type toJSONSchema = (input: string) => string;
type merge = (a: string, b: string) => string;

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
  let result = await WebAssembly.instantiateStreaming(fetch('/wasm/types.wasm'), go.importObject);
  go.run(result.instance);

  if (after) {
    return after();
  }
}
