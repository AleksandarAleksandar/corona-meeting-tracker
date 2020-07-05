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


const filterByDate = (meetings, startDate, endDate) => {
  let meetingsFiltered = meetings.filter(item => {
    let inRange = false;
    try {
      // console.log(item.date);
      let d = new Date(item.date);
      var d1 = new Date(startDate);
      var d2 = new Date(endDate);
      d2.setHours(d2.getHours() + 1); // fix
      if (d >= d1 && d <= d2) {
        inRange = true;
      }
    } catch (error) {
      console.log('Error - at least one of the dates is not valid')
      console.log(error)
    }
    if (inRange) {
      return true;
    }
    return false;
  });

  return meetingsFiltered;
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


export { search, filterByDate, groupBy };