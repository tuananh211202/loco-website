import { useMutation, useQuery } from "react-query";
import { UserBox } from "../../components/User/user-box";
import { mainContentContainerStyle } from "./styles"
import { FriendRequestApi } from "../../midlewares/api";

const PeoplePage = () => {
  const { data: receiverRequest, refetch } = useQuery(['listFriendRequest'], FriendRequestApi.getListRequest);

  const actionRequestMutation = useMutation(FriendRequestApi.actionRequest, {
    onSuccess: () => {
      window.location.reload();
    }
  });

  const handleRequest = (rqUserId: number, type: string) => {
    actionRequestMutation.mutate({ userId: rqUserId, type });
  }

  return (
    <div style={mainContentContainerStyle}>
      {(receiverRequest ?? []).map((user) => (
        <UserBox 
          name={user.name} type="receiver" 
          handleAccept={() => handleRequest(user.userId, 'accept')}
          handleDecline={() => handleRequest(user.userId, 'decline')}
        />
      ))}
    </div>
  )
}

export default PeoplePage;