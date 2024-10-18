import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [displayAddFriend, setDisplayAddFriend] = useState(false);
  const [activeUser, setActiveUser] = useState(0);
  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriend() {
    setDisplayAddFriend(!displayAddFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList setActive={setActiveUser} friends={friends} />
        {displayAddFriend ? (
          <FormAddFriend friends={friends} setFriends={setFriends} />
        ) : (
          ""
        )}
        <Button onClickButton={handleAddFriend}>
          {!displayAddFriend ? "Add Friend" : "Close"}
        </Button>
      </div>
      {activeUser !== 0 ? (
        <FormSplitBill setActiveUser={setActiveUser} activeUser={activeUser} />
      ) : (
        ""
      )}
    </div>
  );
}

function FriendsList({ setActive, friends }) {
  const friendarr = friends;
  return (
    <ul>
      {friendarr.map((friend) => (
        <Friend setActive={setActive} friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend, setActive }) {
  function selectFriend() {
    console.log(friend);
    setActive(friend);
  }

  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}

      <Button onClickButton={selectFriend}>Select</Button>
    </li>
  );
}

function Button({ children, onClickButton }) {
  return (
    <button className="button" onClick={onClickButton}>
      {children}
    </button>
  );
}

function FormAddFriend({ friends, setFriends }) {
  const [newName, setName] = useState("");
  const [img, setImg] = useState("");

  function addFriend() {
    const friendsarr = friends;
    const newfriend = {
      id: Math.floor(Math.random() * 100000) + 1,
      name: newName,
      image: img,
      balance: 0,
    };
    console.log(newfriend);

    const newFriendsArray = [...friendsarr, newfriend];
    setFriends(newFriendsArray);
  }
  return (
    <form className="form-add-friend">
      <h3>Friend name</h3>
      <input
        type="text"
        value={newName}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <h3>Image URL</h3>
      <input
        type="text"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      ></input>
      <Button
        onClickButton={(e) => {
          e.preventDefault();
          addFriend();
        }}
      >
        Add
      </Button>
    </form>
  );
}

function FormSplitBill({ activeUser, setActiveUser }) {
  const [userPaying, setUserPaying] = useState("user");
  const [bill, setBill] = useState(0);
  const [userBill, setUserBill] = useState(0);
  const debt = bill - userBill;

  function updateDebt() {
    if (debt === 0 || bill === 0) return;

    userPaying === "user"
      ? (activeUser.balance = activeUser.balance + debt)
      : (activeUser.balance = activeUser.balance - debt);
    setActiveUser(0);
  }

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {activeUser.name}</h2>
      <h3>Bill Value</h3>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      ></input>
      <h3>Your Expenses</h3>
      <input
        type="text"
        disabled={userPaying === "friend" && true}
        value={userPaying === "user" ? userBill : debt}
        onChange={(e) =>
          setUserBill(
            Number(e.target.value) > bill ? userBill : Number(e.target.value)
          )
        }
      ></input>
      <h3>{activeUser.name}'s Expenses</h3>
      <input
        type="text"
        disabled={userPaying === "user" && true}
        value={userPaying === "friend" ? userBill : debt}
        onChange={(e) =>
          setUserBill(
            Number(e.target.value) > bill ? userBill : Number(e.target.value)
          )
        }
      ></input>

      <h3>Who is paying the bill?</h3>
      <select onChange={(e) => setUserPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{activeUser.name}</option>
      </select>
      <Button
        onClickButton={(e) => {
          e.preventDefault();
          updateDebt();
        }}
      >
        Split Bill
      </Button>
    </form>
  );
}
