function cleanSet(set, startString) {
  if (!startString || !startString.length) {
    return '';
  }

  const filteredValues = Array.from(set)
    .filter((value) => value && value.startsWith(startString))
    .map((value) => value.slice(startString.length));

  return filteredValues.join('-');
}

export default cleanSet;
