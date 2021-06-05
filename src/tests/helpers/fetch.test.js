import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe("Pruebas en el helper fetch.js", () => {
  let token = "";

  test("fetchSinToken debe de funcionar", async () => {
    const resp = await fetchSinToken(
      "auth",
      { email: "test@test.com", password: "123456" },
      "POST"
    );

    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();

    expect(body.ok).toBe(true);

    token = body.token;
  });

  test("fetchConToken debe de funcionar", async () => {
    localStorage.setItem("token", token);

    const resp = await fetchConToken(
      "events/60b68b6c5a6608301059c93d",
      {},
      "DELETE"
    );

    const body = await resp.json();

    expect(body.msg).toBe("Evento no existe con ese id");
  });
});
