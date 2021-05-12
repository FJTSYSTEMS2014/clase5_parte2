const express = require ('express');
//const { DB } = require('./database');
const database = require ('./database');
//funcion para muchos endpoints
const userAPI = express.Router ();

userAPI.get ('/users', (req, res) => {
  res.json (database.DB);
  console.log (database.DB);
  console.info ('get :http://localhost:3500/api/users/');
});

userAPI.get ('/users/:name', (req, res) => {
  console.log ('Mostrar BD por nombre de: A --> Z');
  console.log ('GET:  http://localhost:3000/users/:name?');

  function comparacion (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  res.json (database.DB.sort (comparacion));
  console.log (database.DB.sort (comparacion));
});

userAPI.post ('/users', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const user = {
    name: name.trim (),
    age: parseInt (age),
    tiempo: new Date (),
  };

  console.info ('POST :http://localhost:3500/api/users/');
  database.add (user);
  res.json (user);
});

userAPI.delete ('/users/:Id', (req, res) => {
  console.info ('DELETE :http://localhost:3500/api/users/:Id');
  const userId = parseInt (req.params.Id);
  const userIndex = database.DB.findIndex (item => item.id === userId);

  if (userIndex > -1) {
    database.DB.splice (userIndex, 1);
    console.info (`se eliminino el usuario Id: ${userId}`);
    res.json ({
      message: `se eliminino el usuario Id: ${userId}`,
    });
  } else {
    res.sendStatus (404);
  }
});

userAPI.put ('/users/:Id', (req, res) => {
  console.info (' Metodo PuT :http://localhost:3500/api/users/:Id');
  const userId1 = parseInt (req.params.Id);

  const nameNew = req.body.name;
  const ageNew = req.body.age;
  console.log (userId1, nameNew, ageNew);
  const user1 = database.update (userId1, {
    name: nameNew.trim (),
    age: parseInt (ageNew),
    tiempo: new Date (),
  });
  console.log (user1);
  res.json (user1);
});

// module es propio de node para exportar.
module.exports = userAPI;
