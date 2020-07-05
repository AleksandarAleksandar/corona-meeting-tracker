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


const cloneArrayPure = (arr) => {
  return [...arr];
};


const groupBy = (meetings, groupByPerson) => {
  // this function make object where each property conatin array of meetings
  let groups_obj = {};
  let group_key;
  meetings.forEach((item) => {
    if (groupByPerson) {
      group_key = item.firstname + ' ' + item.lastname;
    } else {
      group_key = item.date;
    }

    if (groups_obj[group_key]) {
      groups_obj[group_key].push(item); // push into existing array
    } else {
      groups_obj[group_key] = [item]; // make new array
    }
  });

  return groups_obj;
};


export { search, groupBy };