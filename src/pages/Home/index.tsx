import { mainContentContainerStyle } from "./styles";
import { PostBox, PostType } from "../../components/Post/post-box";
import { posts } from "../../utils/constants";

const HomePage = () => {

  return <div style={mainContentContainerStyle} className="element">

    <div style={{ width: '50%' }}>
      {posts.filter((_post, index) => index % 2 === 0).map((post: PostType) => {
        return <PostBox post={post} />
      })}
    </div>

    <div style={{ width: '50%' }}>
      {posts.filter((_post, index) => index % 2 === 1).map((post: PostType) => {
        return <PostBox post={post} />
      })}
    </div>
   
  </div>;
}

export default HomePage;
