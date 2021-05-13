function User() {
  console.log('sdsdsd');
  const userInfo = [{ username: '1234', password: '1234' }];
  const loginReq = (data: any) => {
    let result = false;
    userInfo.forEach((item) => {
      if (item.username === data.username && item.password === data.password) result = true;
    });
    console.log(userInfo);
    return result;
  };
  const joinReq = (data: any) => {
    console.log(data);
    userInfo.push({ username: data.username, password: data.password });
  };
  return { loginReq, joinReq };
}
export default User;
