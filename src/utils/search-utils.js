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


const makeGroups = (meetings, groupByPerson) => {
  let target_index;

  // NEW
  let person_id;
  let date_id;
  let meetingsGroups = [];

  if (meetings.length > 0) {
    // creating first group and inserting first item
    let new_group;
    if (groupByPerson) {
      person_id = meetings[0].firstname + meetings[0].lastname;
      new_group = {
        group_id: person_id,
        meetings: [meetings[0]]
      };
      meetingsGroups.push(new_group); // INSERT
    } else {
      date_id = meetings[0].date;
      new_group = {
        group_id: date_id,
        meetings: [meetings[0]]
      };
      meetingsGroups.push(new_group); // INSERT
    }

  }




  // group all other itmes

  meetings.forEach((item) => {
    //
    person_id = item.firstname + item.lastname;
    date_id = item.date;
    //
    meetingsGroups.forEach((group, index) => {
      console.log(groupByPerson, person_id, group.group_id, !groupByPerson, date_id, group.group_id);
      if ((groupByPerson && (person_id === group.group_id)) || (!groupByPerson && (date_id === group.group_id))) {
        console.log(true);
        // doing UPDATE
        target_index = index;
        let target_group = meetingsGroups[target_index];
        let old_meetings = cloneArrayPure(target_group.meetings);  // pure clone of array
        meetingsGroups[target_index] = {
          ...target_group,
          meetings: [...old_meetings, item]
        }; // UPDATE
      } else {
        console.log(false)
        // that kind of group not exist. doing INSERT
        let new_group;
        if (groupByPerson) {
          new_group = {
            group_id: person_id,
            meetings: [item]
          };
        } else {
          new_group = {
            group_id: date_id,
            meetings: [item]
          };
        }
        meetingsGroups.push(new_group); // INSERT
      }
    }); // end of foreach

  });


  return meetingsGroups;
}


export { search, makeGroups };