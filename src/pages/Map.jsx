import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadPosts,
  savePost,
  setCurrPage,
  setFilterByPosts,
} from '../store/actions/postActions'
import GoogleMapReact from 'google-map-react'
import {
  getUsers,
  setFilterByUsers,
  updateUser,
} from '../store/actions/userActions'
import { UserIconPos } from '../cmps/map/UserIconPos'
import { MapMenu } from '../cmps/map/MapMenu'
import { PostIconMap } from '../cmps/map/PostIconMap'
import { ImgPreview } from '../cmps/profile/ImgPreview'
import { CreatePostModal } from '../cmps/posts/CreatePostModal'

export function Map() {
  const dispatch = useDispatch()

  const [isCloseUserIcon, setIsCloseUserIcon] = useState(false)
  const [isMapClicked, setIsMapClicked] = useState(false)
  const [menuPosition, setMenuPosition] = useState(null)
  const [postToPreview, setPostToPreview] = useState(false)
  const [isShowCreatePost, setIsCreateShowPost] = useState(false)
  console.log({ menuPosition })

  const { loggedInUser } = useSelector((state) => state.userModule)
  const { users } = useSelector((state) => state.userModule)
  const { posts } = useSelector((state) => state.postModule)

  useEffect(() => {
    dispatch(setCurrPage('jobs'))
    const filterBy = {
      position: 'position',
    }
    dispatch(setFilterByUsers(filterBy))
    dispatch(getUsers())
    dispatch(setFilterByPosts(filterBy))
    dispatch(loadPosts())
    getLocation()

    return () => {
      dispatch(setFilterByPosts(null))
      dispatch(setFilterByPosts(null))
    }
  }, [])

  const saveUser = (position) => {
    if (!loggedInUser) return
    console.log('save user pos', position)
    dispatch(updateUser({ ...loggedInUser, position })).then((res) =>
      console.log(res)
    )
  }

  const togglePostToPreview = (post) => {
    if (postToPreview) setPostToPreview(null)
    else {
      setPostToPreview(post)
    }
  }

  const toggleShowCreatePost = () => {
    setIsCreateShowPost((prev) => !prev)
  }

  const onAddPost = (post) => {
    const postToAdd = {
      ...post,
      userId: loggedInUser._id,
      position: menuPosition,
    }
    dispatch(savePost(postToAdd)).then(() => toggleShowCreatePost())
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }
  function showPosition(position) {
    const positionToSave = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }

    if (position) {
      saveUser(positionToSave)
    }
  }

  const closeUserIcon = () => {
    console.log('closeUserIcon')
    setIsCloseUserIcon((prev) => !prev)
  }

  const onClickMap = (ev) => {
    const positionOfMenu = {
      lat: ev.lat,
      lng: ev.lng,
    }
    closeUserIcon()
    setMenuPosition(positionOfMenu)
    setIsMapClicked((prev) => !prev)
  }

  const defaultProps = {
    center: {
      lat: 32.05591645013164,
      lng: 34.7549857056555,
    },
    zoom: 5,
  }

  console.log('render Map')
  return (
    // Important! Always set the container height explicitly
    <section className="map-page ">
      <div className="map" style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onClick={(ev) => {
            onClickMap(ev)
          }}
        >
          {users &&
            users.map((user) => (
              <UserIconPos
                key={user._id}
                lat={user?.position?.lat || 32.05591645013164}
                lng={user?.position?.lng || 34.7549857056555}
                url={user.imgUrl}
                userId={user._id}
                fullname={user.fullname}
                isCloseUserIcon={isCloseUserIcon}
              />
            ))}

          {posts &&
            posts.map((post) => (
              <PostIconMap
                key={post?._id}
                lat={post?.position?.lat}
                lng={post?.position?.lng}
                post={post}
                setPostToPreview={setPostToPreview}
              />
            ))}

          {isMapClicked && menuPosition && (
            <MapMenu
              menuPosition={menuPosition}
              lat={menuPosition.lat}
              lng={menuPosition.lng}
              setIsCreateShowPost={setIsCreateShowPost}
            />
          )}
        </GoogleMapReact>
      </div>
      {postToPreview && (
        <ImgPreview
          toggleShowImg={togglePostToPreview}
          title={postToPreview.title}
          body={postToPreview.body}
          imgUrl={postToPreview.imgBodyUrl}
          post={postToPreview}
        />
      )}

      {isShowCreatePost && (
        <CreatePostModal
          isShowCreatePost={isShowCreatePost}
          onAddPost={onAddPost}
          toggleShowCreatePost={toggleShowCreatePost}
          loggedInUser={loggedInUser}
        />
      )}
    </section>
  )
}
