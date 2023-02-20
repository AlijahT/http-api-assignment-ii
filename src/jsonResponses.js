const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// If the page cannot be found, then it will run this
const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for could not be located.',
    id: 'not found',
  };

  respondJSON(request, response, 404, responseJSON);
};

// JSON response for getting users
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

// Hadles the POST request
const addUser = (request, response, body) => {
  // the default JSON response
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  // A check to make sure that both parameters are filled in
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code
  let responseCode = 204;

  // if the user does not exist set code 201 and create an empty user
  if (!users[body.name]) {
    responseCode = 201;
    users[body.name] = {};
  }

  // add fields for the users name and age
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  // response for a 201 status code
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getUsers,
  addUser,
  notReal,
};
