import { useEffect } from "react";

export type AOCProps = {
  day: number;
  year: number;
};

export function AOCFrame({ year, day }: AOCProps) {
  useEffect(() => {
    fetch(`http://localhost:3002/aoc/${year}/${day}`, {
      method: "GET",
    }).then((res) => {
      res.blob().then((blob) => {
        const urlObject = URL.createObjectURL(
          new Blob([blob], { type: "text/html" })
        );
        document.querySelector("#aoc-frame")!.setAttribute("src", urlObject);
      });
    });
  }, [year, day]);
  return (
    <iframe
      id="aoc-frame"
      style={{ width: "100%", height: "95%", border: "none" }}
    />
  );
}
