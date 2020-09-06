const users = [];

//Join User To Chat

function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

///get cur user

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

//User Leaves
function userLeaveChat(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

//Get Room Users
function getRooms(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getUserById,
  userLeaveChat,
  getRooms,
};
