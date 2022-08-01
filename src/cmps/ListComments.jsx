import { CommentPreview } from './CommentPreview'

export const ListComments = ({ comments }) => {
  return (
    <section className="list-comments">
      {comments.map((comment) => (
        <CommentPreview key={comment._id} comment={comment} />
      ))}
    </section>
  )
}