const courses = [
  { id: "web-basic", title: "Webの基礎", description: "HTMLとCSSでページを組み立てる" },
  { id: "cloudflare", title: "Cloudflare Workers入門", description: "エッジで動くAPIを公開する" },
  { id: "api-design", title: "API設計", description: "小さく保守しやすいAPIを設計する" }
];

const events = [
  { date: "2026-09-18", title: "Workersハンズオン", place: "オンライン" },
  { date: "2026-09-25", title: "API設計レビュー", place: "第2実習室" },
  { date: "2026-10-02", title: "成果発表会", place: "第1実習室" }
];

const fortunes = [
  { rank: "大吉", message: "小さく試して、早めに確かめると流れが開けます。" },
  { rank: "中吉", message: "誰かに見せることで、次の改善点が見つかります。" },
  { rank: "吉", message: "昨日の自分のコードを一つだけ整理してみましょう。" }
];

function json(data, status = 200, origin = "*") {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "Content-Type"
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = env.ALLOWED_ORIGIN || "*";

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: {
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "Content-Type"
    } });
    if (request.method !== "GET") return json({ error: "Method Not Allowed" }, 405, origin);

    if (url.pathname === "/" || url.pathname === "/api") {
      return json({ service: "senka-api", status: "ok", endpoints: ["/api/course", "/api/hello?name=山田", "/api/fortune", "/api/events"] }, 200, origin);
    }
    if (url.pathname === "/api/course") return json({ courses }, 200, origin);
    if (url.pathname === "/api/events") return json({ events }, 200, origin);
    if (url.pathname === "/api/fortune") return json({ fortune: fortunes[Math.floor(Math.random() * fortunes.length)] }, 200, origin);
    if (url.pathname === "/api/hello") {
      const name = url.searchParams.get("name")?.trim();
      if (!name) return json({ error: "name is required" }, 400, origin);
      return json({ message: `${name}さん、こんにちは！`, name }, 200, origin);
    }
    return json({ error: "Not Found" }, 404, origin);
  }
};