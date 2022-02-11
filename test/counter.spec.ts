const { COUNTER } = getMiniflareBindings();
const id = COUNTER.newUniqueId();
const stub = COUNTER.get(id);

// Note this is beforeAll, not beforeEach, yet each test still has isolated storage.
// See https://v2.miniflare.dev/jest.html#isolated-storage for more details.
beforeAll(async () => {
  const storage = await getMiniflareDurableObjectStorage(id);
  await storage.put("count", 5);
});

test("should increment count", async () => {
  const res = await stub.fetch(new Request("http://localhost/increment"));
  expect(await res.text()).toContain("⬆️ 6");
});

test("should decrement count", async () => {
  const res = await stub.fetch(new Request("http://localhost/decrement"));
  // Note that the increment from above was automatically "undone", as we expect 4 not 5
  expect(await res.text()).toContain("⬇️ 4");
});

test("should get current count", async () => {
  const res = await stub.fetch("http://localhost/");
  expect(await res.text()).toContain("➡️ 5");
});

test("should default count to 0", async () => {
  const storage = await getMiniflareDurableObjectStorage(id);
  await storage.delete("count");
  const res = await stub.fetch(new Request("http://localhost/"));
  expect(await res.text()).toContain("➡️ 0");
});

test("should return 404 on not found", async () => {
  const res = await stub.fetch("http://localhost/unknown");
  expect(res.status).toBe(404);
});
