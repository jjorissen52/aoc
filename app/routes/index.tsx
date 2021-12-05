import { Heading } from "~/components/Semantic";
import { LoaderFunction, useLoaderData } from "remix";
import { getYears } from "~/utils/file.server";
import RemixLink from "~/overrides/RemixLink";

export const loader: LoaderFunction = async () => {
  const years = await getYears();
  return { years };
};

export default function Default() {
  const { years } = useLoaderData();
  return (
    <Heading
      sx={{
        display: "flex",
        justifyContent: "space-around",
        height: "100px",
      }}
    >
      Advent of Code
      <ul>
        {years.map((year: number) => (
          <li key={year}>
            <RemixLink to={`/years/${year}`}>{year}</RemixLink>
          </li>
        ))}
      </ul>
    </Heading>
  );
}
