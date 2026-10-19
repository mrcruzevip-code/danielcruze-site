const BOOKS = [
  {
    id: "gentlemans-guide-book-one",
    title: "The Gentleman's Guide to Intimacy, Pleasure, & Sensual Dominance",
    subtitle: "Book 1 of 5 — Foundations of Connection and Pleasure",
    availability: "AVAILABLE NOW",
    amazon: "https://www.amazon.com.au/dp/B0HNGVX967",
    stripe: "https://buy.stripe.com/9B6dR92jv68A2SY2K46wE0F",
    price: "Kindle $14.32",
  },
  {
    id: "path-of-transformation",
    title: "The Path of Transformation",
    subtitle: "From Ego to Essence",
    stripe: "https://buy.stripe.com/7sY4gzcY9fJaalq2K46wE0E",
    price: "A$34.95 AUD",
  },
  {
    id: "12-sacred-principles",
    title: "12 Sacred Principles",
    subtitle: "For Living with Meaning",
    stripe: "https://buy.stripe.com/3cIdR93nz7cEfFK1G06wE0m",
    price: "A$33 AUD",
  },
];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname === "/mcp/books" || url.pathname === "/") {
      return new Response(JSON.stringify({ name: "danielcruze-books", version: "1.0.0", books: BOOKS }, null, 2), { headers });
    }

    const id = url.pathname.replace(/^\/books\//, "");
    if (id && id !== url.pathname) {
      const book = BOOKS.find((b) => b.id === id);
      return new Response(JSON.stringify(book || { error: "not found" }), { status: book ? 200 : 404, headers });
    }

    return new Response(JSON.stringify({ error: "not found" }), { status: 404, headers });
  },
};
