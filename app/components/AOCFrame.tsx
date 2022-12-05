import { useEffect } from "react";

export type AOCProps = {
  url: string;
};

export function AOCFrame({ url }: AOCProps) {
  useEffect(() => {
    const origin = new URL(window.location.href).origin;
    fetch(`${origin}/aoc${url}`, {
      method: "GET",
    }).then((res) => {
      res.blob().then((blob) => {
        const urlObject = URL.createObjectURL(
          new Blob([blob], { type: "text/html" })
        );
        document.querySelector("#aoc-frame")!.setAttribute("src", urlObject);
      });
    });
  }, [url]);
  return (
    <iframe
      id="aoc-frame"
      style={{ width: "100%", height: "95%", border: "none" }}
    />
  );
}
