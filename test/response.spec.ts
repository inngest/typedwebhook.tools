import { buildResponse } from "@/response";

test("should build response", async () => {
  const res = buildResponse("text");
  expect(res.status).toBe(200);
  expect(res.headers.get("Content-Type")).toBe("text/html; charset=UTF-8");
  expect(await res.text()).toContain("<h1>text</h1>");
});

test("should build response with custom status", () => {
  const res = buildResponse("not found", 404);
  expect(res.status).toBe(404);
});
