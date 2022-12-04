import { Heading } from "~/components/Semantic";
import { useLoaderData } from "@remix-run/react";
import { getYears } from "~/utils/file.server";
import { Link } from "@remix-run/react";
import MuiLink from "@mui/material/Link";

export const loader = async () => {
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
            <MuiLink component={Link} to={`/years/${year}`}>
              {year}
            </MuiLink>
          </li>
        ))}
      </ul>
    </Heading>
  );
}
