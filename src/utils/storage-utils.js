const storageUtils = {};

storageUtils.set = (data) => {
  let json = JSON.stringify(data);
  localStorage.setItem('app_db', json);
  return true;
}

storageUtils.get = () => {
  let data = null;
  let readed = localStorage.getItem('app_db');
  try {
    data = JSON.parse(readed);
  } catch (error) {
    console.log(error);
    alert('Error!');
  }
  return data;
}

storageUtils.clear = () => {
  localStorage.removeItem('app_db');
  return true;
}

export default storageUtils;