import { ReactSnip } from '@strg/react-snip'

export function PostBody({
  body,
  imgUrl,
  videoUrl,
  toggleShowImgPreview,
  link,
  title,
}) {
  return (
    <section className="post-body">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="post-text">
        <p>{body}</p>
      </div>
      <div className="link">
        {link && (
          // <ReactSnip lines={1} method={'css'}>
          <a href={link} target="_blank">
            Open link <span className="the-link">{link}</span>
          </a>
          // </ReactSnip>
        )}
      </div>
      <div className="img-container" onClick={toggleShowImgPreview}>
        {imgUrl && <img src={imgUrl} alt="" />}
      </div>
      <div className="video-container">
        {videoUrl && (
          <video width="100%" height="300" controls>
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>
    </section>
  )
}
