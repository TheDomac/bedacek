const getUpdatedRow = (row, value) => {
  if (row.every((value) => value !== null)) {
    return row;
  }

  const emptyPlaceIndex = row.findIndex((value) => value === null);
  return [
    ...row.slice(0, emptyPlaceIndex),
    value,
    ...row.slice(emptyPlaceIndex + 1),
  ];
};

export default getUpdatedRow;
