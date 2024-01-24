import { mainContentContainerStyle } from "./styles";
import { PostBox, PostType } from "../../components/Post/post-box";
import { PostApi } from "../../midlewares/api";
import { useQuery } from "react-query";

const HomePage = () => {

  const { data: listPost } = useQuery(['postList'], () => PostApi.getPosts());


  return <div style={mainContentContainerStyle} className="element">

    <div style={{ width: '50%' }}>
      {(listPost ?? []).filter((_post, index) => index % 2 === 0).map((post: PostType) => {
        return <PostBox post={post} />
      })}
    </div>

    <div style={{ width: '50%' }}>
      {(listPost ?? []).filter((_post, index) => index % 2 === 1).map((post: PostType) => {
        return <PostBox post={post} />
      })}
    </div>
   
  </div>;
}

export default HomePage;
