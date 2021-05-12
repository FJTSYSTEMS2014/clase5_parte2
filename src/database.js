let id = 0;
const DB = [{name: 'Juan', age: 30, tiempo: new Date (), id: 0}];

module.exports = {
  DB,

  add (user) {
    id++;
    user.id = id;
    DB.push (user);
  },
};
