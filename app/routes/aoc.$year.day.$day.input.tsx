const SESSION_ID = process.env.AOC_SESSION_ID;

export async function loader({
  params,
}: {
  request: Request;
  params: { year: string; day: string };
}) {
  const { year, day } = params;
  const res = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    method: "GET",
    headers: SESSION_ID
      ? {
          Cookie: `session=${SESSION_ID}`,
        }
      : {},
  });
  if (!SESSION_ID)
    return new Response(
      new Blob(
        [
          '"You are not authenticated please set AOC_SESSION_ID in your .env file."',
        ],
        { type: "application/json" }
      )
    );
  return new Response(await res.blob());
}
