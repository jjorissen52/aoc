import { AOCProps } from "~/components/AOCFrame";
import { JSDOM } from "jsdom";

const SESSION_ID = process.env.AOC_SESSION_ID;

export async function loader({ params }: { params: AOCProps }) {
  const { year, day } = params;
  const res = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
    method: "GET",
    headers: SESSION_ID
      ? {
          Cookie: `session=${SESSION_ID}`,
        }
      : {},
  });
  const DOM = new JSDOM(await (await res.blob()).text());
  const document = DOM.window.document;
  // delete tracking scripts
  Array.from(document.querySelectorAll("script")).forEach((s) => s.remove());

  // make stylesheets point at AOC
  Array.from(document.querySelectorAll("link")).forEach((link) => {
    if (link.href.match(/\/[^\/]/))
      link.href = `https://adventofcode.com/${link.href}`;
  });

  // remove sidebar because we don't need it
  document.getElementById("sidebar")?.remove();
  Array.from(document.querySelectorAll("article")).forEach(
    (article) => (article.style.width = "100%")
  );

  const loggedOut = !Array.from(document.querySelectorAll("a"))
    .map((a) => a.href)
    .filter((href) => href.includes("logout")).length;

  if (loggedOut || !SESSION_ID) {
    const container = document.createElement("article");
    const header = document.createElement("h1");
    const warning = document.createTextNode(
      SESSION_ID
        ? "Your session could not be authenticated, so this page will not show you everything."
        : "You are not authenticated. Check your cookies and set your AOC_SESSION_ID in your .env file."
    );

    header.append(warning);
    header.style.color = "red";
    container.append(header);
    document.querySelector("main")?.prepend(container);
  }

  return new Response(new Blob([DOM.serialize()], { type: "text/html" }));
}
