export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];

// star angle
const angle1 = Math.PI / 9;

// star centre
const centre = [550, 330];
// star radius
const radius = 300;
// star smaller radius
const radius2 = (radius * Math.cos(2 * angle1)) / Math.cos(angle1);

const starAngle = Math.PI / 5;
export const getStar = (c, r, i) => {
  const r2 = (r * Math.cos(2 * starAngle)) / Math.cos(starAngle);
  return add(c, [
    (i % 2 === 0 ? r : r2) * Math.sin(starAngle * i),
    -(i % 2 === 0 ? r : r2) * Math.cos(starAngle * i),
  ]);
};

export const getOuter = i =>
  add(centre, [
    (i % 2 === 0 ? radius : radius2) * Math.sin(angle1 * i),
    -(i % 2 === 0 ? radius : radius2) * Math.cos(angle1 * i),
  ]);

export const unit = (radius * Math.sqrt(2 * (1 - Math.cos(4 * angle1)))) / 19;

// inner angle of parallelogram
const angle2 = (Math.PI - 4 * angle1) / 2;
// grid origin
const base = add(centre, [0, -radius]);

// inner angle of bottom row
const angle3 = 3 * angle2 - Math.PI / 2;

export const getPoint = (x, y) => {
  return add(base, [
    (Math.abs(x) * (y < 0 ? Math.cos(angle3) : Math.sin(angle2)) -
      Math.abs(y) * (x < 0 ? Math.cos(angle3) : Math.sin(angle2))) *
      unit,
    (Math.abs(x) * (y < 0 ? Math.sin(angle3) : Math.cos(angle2)) +
      Math.abs(y) * (x < 0 ? Math.sin(angle3) : Math.cos(angle2))) *
      unit,
  ]);
};
