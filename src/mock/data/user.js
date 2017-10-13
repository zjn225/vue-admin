import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    account: 'admin',
    password: '123456',
    avatar: 'http://oapjto9xj.bkt.clouddn.com/418905954739679911.jpg',
    name: '张嘉宁'
  }
];

const Users = [];

//造用户
for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
