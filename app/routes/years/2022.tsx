import { yearLoader } from "~/utils/loaders";
import { useLoaderData } from "@remix-run/react";
import CodeFrame from "~/components/CodeFrame";
import React from "react";
import {
  MaxCalorieRunner,
  Top3CalorieRunner,
} from "~/code/2022/calorie_counting";
import { RunnerOption } from "~/components/IO";

export const runners: RunnerOption[] = [
  {
    day: 1,
    title: "Max Calorie Counting",
    file: "calorie_counting",
    runner: MaxCalorieRunner,
  },
  {
    day: 1,
    title: "Top 3 Calorie Counting",
    file: "calorie_counting",
    runner: Top3CalorieRunner,
  },
];

export const loader = yearLoader(2022, runners);

export default function Default() {
  const { code } = useLoaderData();
  return <CodeFrame code={code} year={2022} runners={runners} />;
}
