import * as svg from 'svg.js';

import color from './color';
import { getDates, monthNames } from './dates';
import { add, getOuter, getPoint, getStar, unit } from './grid';
import wave from './wave';

import './style.css';

const colors = {
  base: color(23, 90, 130),
  baseDark: color(23, 90, 145),
  outline: color(23, 90, 100),
  wave: color(15, 90, 103),
  waveRest: color(15, 90, 90),
  text: color(0, 0, 60),
  label: color(0, 0, 60),
  holy: color(15, 60, 60),
  star: color(15, 60, 60),
};

const elem = document.createElement('div');
document.body.appendChild(elem);
const canvas = svg(elem);

const dates = getDates(176, 6);

const drawText = (text, position, color, align = 'middle') => {
  canvas
    .text(`${text}`)
    .x(position[0])
    .y(position[1])
    .font({
      family: 'Georgia',
      size: 6,
    })
    .attr('text-anchor', align)
    .fill(color);
};

// BASE

canvas
  .polygon(Array.from({ length: 18 }).map((_, i) => getOuter(i)))
  .fill(colors.base);
Array.from({ length: 10 }).forEach((_, i) => {
  canvas
    .polygon([
      getPoint(i * 2, 0),
      getPoint(i * 2 + 1, 0),
      getPoint(i * 2 + 1, -19),
      getPoint(i * 2, -19),
    ])
    .fill(colors.baseDark);
});
Array.from({ length: 10 }).forEach((_, i) => {
  canvas
    .polygon([
      getPoint(19, i * 2),
      getPoint(19, i * 2 + 1),
      getPoint(-19, i * 2 + 1),
      getPoint(-19, i * 2),
    ])
    .fill(colors.baseDark);
});

// MAIN

dates.forEach(({ x, y, date, month, day, holy, semiholy }) => {
  const sign = x < 19 && y === 18 ? -1 : 1;
  const points = [
    getPoint(x, sign * y),
    getPoint(x + 1, sign * y),
    getPoint(x + 1, sign * (y + 1)),
    getPoint(x, sign * (y + 1)),
  ];
  const dark = x >= 19 || x % 2 === 0;

  canvas.polygon(points).fill(dark ? colors.baseDark : colors.base);

  wave(canvas, x, sign * y, day === 0 ? colors.waveRest : colors.wave);

  if (x >= 19 || y !== 18) {
    const point = add(getPoint(x, y), [7.5, 12.5]);
    drawText(date, point, holy || semiholy ? colors.holy : colors.text);
    if (x === 0 || date === 1 || holy || semiholy) {
      drawText(
        month,
        add(point, [-16.5, 0]),
        holy || semiholy ? colors.holy : colors.text,
        'start',
      );
    }
  } else {
    const point = add(getPoint(x, -y), [5.5, 14]);
    drawText(date, point, colors.text);
    if (x === 0 || date === 1) {
      drawText(month, add(point, [-16, 0]), colors.text, 'start');
    }
  }

  if (holy) {
    canvas
      .polygon(
        Array.from({ length: 10 }).map((_, i) =>
          getStar(add(getPoint(x, y), [0, 6]), 4, i),
        ),
      )
      .fill(colors.star);
  }
});

// OUTLINE

canvas
  .polygon(Array.from({ length: 18 }).map((_, i) => getOuter(i)))
  .fill('none')
  .stroke({ width: 2, color: colors.outline });

// BORDERS

dates.forEach(({ x, y, holy, semiholy }) => {
  const sign = x < 19 && y === 18 ? -1 : 1;
  const points = [
    getPoint(x, sign * y),
    getPoint(x + 1, sign * y),
    getPoint(x + 1, sign * (y + 1)),
    getPoint(x, sign * (y + 1)),
  ];
  if (holy || semiholy) {
    canvas
      .polygon(points)
      .fill('none')
      .stroke({
        width: 1,
        color: colors.holy,
      });
  }
});
canvas
  .polygon([getPoint(12, 1), getPoint(19, 1), getPoint(19, 2), getPoint(12, 2)])
  .fill('none')
  .stroke({ width: 1, color: colors.holy });
canvas
  .polygon([getPoint(0, 2), getPoint(5, 2), getPoint(5, 3), getPoint(0, 3)])
  .fill('none')
  .stroke({ width: 1, color: colors.holy });
canvas
  .polygon([
    getPoint(19, 18),
    getPoint(19 + dates.length - 19 * 19, 18),
    getPoint(19 + dates.length - 19 * 19, 19),
    getPoint(19, 19),
  ])
  .fill('none')
  .stroke({ width: 1, color: colors.holy });

// LABELS

Array.from({ length: 19 }).forEach((_, i) => {
  drawText(
    `${monthNames[i][0]}   ${i + 1}`,
    add(getPoint(0, i), [-14, 1]),
    colors.label,
    'end',
  );
  drawText(
    `${i + 1}   ${monthNames[i][1]}`,
    add(getPoint(i, 0), [14, 1]),
    colors.label,
    'start',
  );
  drawText(
    i === 18 ? '*    Ayyám-i-Há' : `${i + 1}   ${monthNames[i][1]}`,
    add(getPoint(-20, i), [-14, 1]),
    colors.label,
    'start',
  );
  drawText(
    `${monthNames[i][0]}   ${i + 1}`,
    add(getPoint(i, -20), [14, 1]),
    colors.label,
    'end',
  );
  if (i !== 0 && i !== 18) {
    drawText(`${i + 1}`, add(getPoint(i, i), [0, 7]), colors.label);
  }
});
drawText(
  `19   ${monthNames[18][1]}`,
  add(getPoint(19, -19), [13, 3]),
  colors.label,
  'start',
);
