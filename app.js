const { use } = require("react");

const user = {
  name: "Nadeen",
  role: "FrontEnd Developer",
  company: "TAG",
};

function greetUser(user) {
  return `Welcome ${user.name}!`;
}
console.log(greetUser(user));
