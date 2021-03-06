import storageUtils from './storage-utils'

const ajaxSimulator = {};

ajaxSimulator.getMeetings = async () => {
  let meetings = storageUtils.get();
  // data su verovatno samo meetings
  return new Promise(resolve => setTimeout(() => {
    resolve(meetings)
  }, 1000));
};

ajaxSimulator.postMeeting = async (new_meeting) => {
  let meetings = storageUtils.get();
  if (!Array.isArray(meetings)) {
    meetings = []
  };
  let new_meetings = [...meetings, new_meeting];
  storageUtils.set(new_meetings);
  // simulate return of succesful ajax request
  let success_ajax_res = {
    success: true
  };
  return new Promise(resolve => setTimeout(() => {
    resolve(success_ajax_res)
  }, 1000));
};

export default ajaxSimulator;