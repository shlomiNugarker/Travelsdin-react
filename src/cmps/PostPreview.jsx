import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Comments } from './Comments'
import { PostActions } from './PostActions'
import { PostBody } from './PostBody'
import { PostHeader } from './PostHeader'
import { SocialDetails } from './SocialDetails'

export const PostPreview = ({ post, fullname }) => {
  const { name, body, comments, imgBodyUrl } = post
  return (
    <section className="post-preview">
      <div className="menu">
        <FontAwesomeIcon className="dots-icon" icon="fa-solid fa-ellipsis" />
      </div>
      <PostHeader post={post} fullname={fullname} />
      <PostBody body={body} imgUrl={imgBodyUrl} />
      <SocialDetails />
      <hr />
      <PostActions />
      <Comments comments={comments} />
    </section>
  )
}
