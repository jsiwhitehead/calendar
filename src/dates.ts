const startGDates = {
  174: 20,
  175: 21,
  176: 21,
  177: 20,
  178: 20,
  179: 21,
  180: 21,
  181: 20,
  182: 20,
  183: 21,
  184: 21,
};

export const monthNames = [
  ['Bahá', 'Splendour'],
  ['Jalál', 'Glory'],
  ['Jamál', 'Beauty'],
  ['‘Aẓamat', 'Grandeur'],
  ['Núr', 'Light'],
  ['Raḥmat', 'Mercy'],
  ['Kalimát', 'Words'],
  ['Kamál', 'Perfection'],
  ['Asmá’', 'Names'],
  ['‘Izzat', 'Might'],
  ['Mashíyyat', 'Will'],
  ['‘Ilm', 'Knowledge'],
  ['Qudrat', 'Power'],
  ['Qawl', 'Speech'],
  ['Masá’il', 'Questions'],
  ['Sharaf', 'Honour'],
  ['Sulṭán', 'Sovereignty'],
  ['Mulk', 'Dominion'],
  ['‘Alá’', 'Loftiness'],
];
const gMonths = [
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
];
const gLengths = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28, 31];

const holy = [
  [1, 1],
  [2, 13],
  [3, 2],
  [3, 5],
  [4, 8],
  [4, 13],
  [6, 17],
  [12, 4],
  [12, 5],
];
const semiholy = [
  [14, 4],
  [14, 6],
];

const isLeap = gy => {
  if (gy % 4 !== 0) return false;
  if (gy % 100 !== 0) return true;
  if (gy % 400 !== 0) return false;
  return true;
};

const range = (start, end) =>
  Array.from({ length: end - start + 1 }).map((_, i) => start + i);

export const getDates = (startYear, startDay) => {
  const leap = isLeap(1843 + startYear + 1);
  const count =
    365 + startGDates[startYear + 1] - startGDates[startYear] + (leap ? 1 : 0);
  const extra = count - 361;
  const base = gLengths.reduce<any>(
    (res, l, i) => [
      ...res,
      ...range(
        i === 0 ? startGDates[startYear] : 1,
        i === 11 && leap ? l + 1 : l,
      ).map((date, j) => ({
        date,
        month: gMonths[i],
        day: (res.length + startDay + j) % 7,
      })),
    ],
    [],
  );
  return [
    ...range(0, 19 * 19 - 1).map(i => ({ x: i % 19, y: Math.floor(i / 19) })),
    ...range(0, extra - 1).map(i => ({ x: 19 + i, y: 18 })),
  ].map(({ x, y }) => ({
    x,
    y,
    ...base[x < 19 ? y * 19 + x + (y === 18 ? extra : 0) : 17 * 19 + x],
    holy: !!holy.find(d => d[0] === y + 1 && d[1] === x + 1),
    semiholy: !!semiholy.find(d => d[0] === y + 1 && d[1] === x + 1),
  }));

  // return {
  //   main: range(0, 18).map(i =>
  //     range(0, 18).map(j => ({
  //       ...base[i * 19 + j + (i === 18 ? extra : 0)],
  //       holy: !!holy.find(x => x[0] === i + 1 && x[1] === j + 1),
  //       semiholy: !!semiholy.find(x => x[0] === i + 1 && x[1] === j + 1),
  //     })),
  //   ),
  //   extra: range(1, extra).map(i => base[341 + i]),
  // };
};
