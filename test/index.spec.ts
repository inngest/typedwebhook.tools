import { handleRequest } from "@/index";

test("should redirect to example page on no route match", async () => {
  const env = getMiniflareBindings();
  const res = await handleRequest(new Request("http://localhost"), env);
  expect(res.status).toBe(302);
  expect(res.headers.get("Location")).toBe("http://localhost/test/increment");
});

test("should pass-through to durable object", async () => {
  const env = getMiniflareBindings();
  const { COUNTER } = env;
  const id = COUNTER.idFromName("name");
  const storage = await getMiniflareDurableObjectStorage(id);
  await storage.put("count", 10);

  const req = new Request("http://localhost/name/increment");
  const res = await handleRequest(req, env);
  expect(res.status).toBe(200);
  expect(await res.text()).toContain("⬆️ 11");

  const newValue = await storage.get("count");
  expect(newValue).toBe(11);
});
