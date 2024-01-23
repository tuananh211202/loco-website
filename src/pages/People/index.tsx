import { UserBox } from "../../components/User/user-box";
import { mainContentContainerStyle } from "./styles"

const PeoplePage = (props) => {
  const users = [
    { name: 'aaaa' },
    { name: 'bbb' }
  ];

  return (
    <div style={mainContentContainerStyle}>
      {users.map((user) => (
        <UserBox name={user.name} type="receiver" />
      ))}
    </div>
  )
}

export default PeoplePage;