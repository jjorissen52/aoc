import { CodeRunner } from "~/code/container";
import { predicateDefault } from "~/code/2021/util";

type Pair = [string, string];

const isSmallRoom = (() => {
  const rooms = <Record<string, boolean>>{};
  return (room: string) => {
    if (!(room in rooms)) rooms[room] = room.toLowerCase() === room;
    return rooms[room];
  };
})();

const traverser = (
  pairs: Pair[],
  smallRoomLimit = 1,
  smallRoomBuff = false
) => {
  const paths = <string[][]>[["start"]];
  const visits = <Record<string, number>[]>[{ start: 1 }];
  // indicate whether the current path has met its small room allowance
  const smallRoomBuffs = <boolean[]>[smallRoomBuff];
  const traverse = (currentPath: number): void => {
    const pathIdx = paths[currentPath].length - 1;
    const currentRoom = paths[currentPath][pathIdx];
    const nextRooms = pairs.reduce((nextRooms, pair) => {
      if (pair[0] === currentRoom) {
        const nextRoom = pair[1];
        if (!isSmallRoom(nextRoom)) {
          nextRooms.push({ nextRoom, requiresBuff: false });
        } else {
          const timesVisited = visits[currentPath][nextRoom] ?? 0;
          if (timesVisited < smallRoomLimit) {
            nextRooms.push({ nextRoom, requiresBuff: false });
          } else {
            if (smallRoomBuffs[currentPath]) {
              nextRooms.push({ nextRoom, requiresBuff: true });
            }
          }
        }
      }
      return nextRooms;
    }, <{ nextRoom: string; requiresBuff: boolean }[]>[]);
    // if there are no viable next rooms, we are done.
    if (!nextRooms.length) return;
    // duplicate the current path as the beginning of other viable paths
    const currentPathCopy = [...paths[currentPath]];
    const currentVisits = { ...visits[currentPath] };
    const currentSmallRoomBuff = smallRoomBuffs[currentPath];
    nextRooms.forEach(({ nextRoom, requiresBuff }, idx) => {
      // the first option is always considered a continuation of the current path
      if (idx === 0) {
        paths[currentPath].push(nextRoom);
        visits[currentPath] = {
          ...currentVisits,
          [nextRoom]:
            currentVisits[nextRoom] !== undefined
              ? currentVisits[nextRoom] + 1
              : 1,
        };
        smallRoomBuffs[currentPath] = currentSmallRoomBuff && !requiresBuff;
        if (nextRoom !== "end") traverse(currentPath);
        return;
      }
      // other options are new paths
      paths.push([...currentPathCopy, nextRoom]);
      visits.push({
        ...currentVisits,
        [nextRoom]:
          currentVisits[nextRoom] !== undefined
            ? currentVisits[nextRoom] + 1
            : 1,
      });
      smallRoomBuffs.push(currentSmallRoomBuff && !requiresBuff);
      if (nextRoom !== "end") traverse(paths.length - 1);
      return;
    });
  };
  return {
    paths,
    traverse: () => traverse(0),
  };
};

const expandPairs = (pairs: Pair[]): Pair[] => {
  return pairs.reduce((agg, [r1, r2]) => {
    if (r1 === "start") agg.push([r1, r2]);
    else if (r2 === "start") agg.push([r2, r1]);
    else if (r1 === "end") agg.push([r2, r1]);
    else if (r2 === "end") agg.push([r1, r2]);
    else {
      agg.push([r1, r2]);
      agg.push([r2, r1]);
    }
    return agg;
  }, <Pair[]>[]);
};

export const PathRunner = new CodeRunner((input: string, ...auxInput) => {
  const smallRoomLimit = predicateDefault(
    parseInt(auxInput[0]),
    (v) => v === v,
    1
  );
  const smallRoomBuff = predicateDefault(
    Boolean(parseInt(auxInput[1])),
    (v) => v === v,
    false
  );

  const pairs = <Pair[]>input
    .split("\n")
    .map((line) => line.split("-"))
    .filter((line) => line.length === 2);
  const pathDescriptions = expandPairs(pairs);
  const { traverse, paths } = traverser(
    pathDescriptions,
    smallRoomLimit,
    smallRoomBuff
  );
  traverse();
  const goodPaths = paths
    .filter((p) => p[p.length - 1] === "end")
    .map((p) => p.join(" "));
  return `${goodPaths.length}:\n${goodPaths.join("\n")}`;
});
