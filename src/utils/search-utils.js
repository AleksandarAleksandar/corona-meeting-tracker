const search = (meetings, q) => {
  let results = [];
  results = meetings.filter((item) => {
    if (q === '') {
      // if empty return all results
      return true;
    }
    if (item.firstname.toUpperCase().includes(q.toUpperCase()) || item.lastname.toUpperCase().includes(q.toUpperCase())) {
      return true;
    }
    return false;
  })
  return results;
};
export default search;