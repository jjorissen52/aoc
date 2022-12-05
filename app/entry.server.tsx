import { renderToString } from "react-dom/server";
import { type EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { watch } from "fs/promises";
import { appPath } from "~/utils/file.server";
import { generateCodeRunnerExports } from "~/utils/codegen.server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

(async () => {
  try {
    const watcher = watch(appPath("code"), { recursive: true });
    for await (const event of watcher) {
      if (
        !event.filename.endsWith("init.ts") &&
        generateCodeRunnerExports(appPath("code", "init.ts"))
      )
        console.log("Regenerated code exports");
    }
  } catch (err) {
    // @ts-ignore
    if (err?.name === "AbortError") return;
    throw err;
  }
})();
