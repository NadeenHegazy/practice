const user = {
  name: "Nadeen Ahmed",
  email: "nadeen@example.com",
  role: "Senior Frontend Developer",
  company: "TAG",
};

function greetUser(user) {
  return `Hello ${user.name}, welcome to your dashboard!`;
}
console.log(greetUser(user));

function getUserEmail(user) {
  return user.email;
}

function getUserName(user) {
  return user.name;
}