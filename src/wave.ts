import { getPoint, unit } from './grid';

const depth = 0.175;
const wave = 0.005;

export default (canvas, x, y, color) => {
  canvas
    .path([
      'M',
      ...getPoint(x, (y < 0 ? -1 : 1) * (Math.abs(y) + 1)),
      'L',
      ...getPoint(x, (y < 0 ? -1 : 1) * (Math.abs(y) + 1 - depth)),
      'C',
      ...getPoint(
        x + unit * wave,
        (y < 0 ? -1 : 1) * (Math.abs(y) + 1 - depth + unit * wave),
      ),
      ...getPoint(
        x + 0.5 - unit * wave,
        (y < 0 ? -1 : 1) * (Math.abs(y) + 1 - depth + unit * wave),
      ),
      ...getPoint(x + 0.5, (y < 0 ? -1 : 1) * (Math.abs(y) + 1 - depth)),
      'S',
      ...getPoint(
        x + 1 - unit * wave,
        (y < 0 ? -1 : 1) * (Math.abs(y) + 1 - depth - unit * wave),
      ),
      ...getPoint(x + 1, (y < 0 ? -1 : 1) * (Math.abs(y) + 1 - depth)),
      'L',
      ...getPoint(x + 1, (y < 0 ? -1 : 1) * (Math.abs(y) + 1)),
      'Z',
    ])
    .fill(color);
};

// for (let y = 0; y < 19; y++) {
//   canvas
//     .path([
//       'M',
//       ...getPoint(0, (y === 18 ? -1 : 1) * (y + 1)),
//       'L',
//       ...getPoint(0, (y === 18 ? -1 : 1) * (y + 1 - depth)),
//       'C',
//       ...getPoint(
//         0 + unit * wave,
//         (y === 18 ? -1 : 1) * (y + 1 - depth + unit * wave),
//       ),
//       ...getPoint(
//         0.5 - unit * wave,
//         (y === 18 ? -1 : 1) * (y + 1 - depth + unit * wave),
//       ),
//       ...getPoint(0.5, (y === 18 ? -1 : 1) * (y + 1 - depth)),
//       ...Array.from({ length: 37 }).reduce<any>(
//         (res, _, i) => [
//           ...res,
//           'S',
//           ...getPoint(
//             (i + 2) * 0.5 - unit * wave,
//             (y === 18 ? -1 : 1) *
//               (y + 1 - depth + ((i % 2) * 2 - 1) * unit * wave),
//           ),
//           ...getPoint((i + 2) * 0.5, (y === 18 ? -1 : 1) * (y + 1 - depth)),
//         ],
//         [],
//       ),
//       'L',
//       ...getPoint(19, (y === 18 ? -1 : 1) * (y + 1)),
//       'Z',
//     ])
//     .fill('rgba(0, 0, 0, 0.1)');
// }
// canvas
//   .path([
//     'M',
//     ...getPoint(19, 19),
//     'L',
//     ...getPoint(19, 19 - depth),
//     'C',
//     ...getPoint(19 + unit * wave, 19 - depth + unit * wave),
//     ...getPoint(19.5 - unit * wave, 19 - depth + unit * wave),
//     ...getPoint(19.5, 19 - depth),
//     ...Array.from({ length: dates.extra.length * 2 - 1 }).reduce<any>(
//       (res, _, i) => [
//         ...res,
//         'S',
//         ...getPoint(
//           19 + (i + 2) * 0.5 - unit * wave,
//           19 - depth + ((i % 2) * 2 - 1) * unit * wave,
//         ),
//         ...getPoint(19 + (i + 2) * 0.5, 19 - depth),
//       ],
//       [],
//     ),
//     'L',
//     ...getPoint(19 + dates.extra.length, 19),
//     'Z',
//   ])
//   .fill('rgba(0, 0, 0, 0.1)');
