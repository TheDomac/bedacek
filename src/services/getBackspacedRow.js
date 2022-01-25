const getBackspacedRow = (row) => {
  if (row.every((value) => value === null)) {
    return row;
  }

  const clearedRow = row.filter((r) => r);
  const rowWithoutLast = clearedRow.slice(0, clearedRow.length - 1);

  return [
    rowWithoutLast[0] || null,
    rowWithoutLast[1] || null,
    rowWithoutLast[2] || null,
    rowWithoutLast[3] || null,
    rowWithoutLast[4] || null,
  ];
};

export default getBackspacedRow;
