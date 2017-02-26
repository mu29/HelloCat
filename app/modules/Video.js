import DataBase from '../firebase/DataBase';

export const VIDEO_LIST_SUCCESS = 'VIDEO_LIST_SUCCESS';
export const VIEW_VIDEO = 'VIEW_VIDEO';
export const CLEAR_VIEW_DATA = 'CLEAR_VIEW_DATA';
export const STAR_VIDEO = 'STAR_VIDEO';
export const UN_STAR_VIDEO = 'UN_STAR_VIDEO';

const defaultState = {
  videos: [],
  unWatchedVideos: [],
  views: [],
  stars: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case VIDEO_LIST_SUCCESS:
      const unWatchedVideos = action.videos.filter(v => state.views.indexOf(v.id) === -1);
      console.log(action.videos);
      console.log(state.views);
      console.log(unWatchedVideos)
      return { ...state, videos: action.videos, unWatchedVideos: unWatchedVideos.length === 0 ? action.videos : unWatchedVideos };
    case VIEW_VIDEO:
      return { ...state, views: [...state.views, action.id].filter((v, i, a) => a.indexOf(v) === i) };
    case CLEAR_VIEW_DATA:
      return { ...state, views: [], unWatchedVideos: state.videos };  
    case STAR_VIDEO:
      return { ...state, stars: [...state.stars, action.id] };
    case UN_STAR_VIDEO:
      return { ...state, stars: state.stars.filter(s => s !== action.id) };
    default:
      return state;
  }
}

function videoListSuccess(videos) {
  return {
    type: VIDEO_LIST_SUCCESS,
    videos,
  };
}

export function readVideoList() {
  return (dispatch, getState) => {
    DataBase.readVideos(videos => {
      dispatch(videoListSuccess(videos));
    });
  };
}

export function viewVideo(id) {
  DataBase.viewVideo(id);
  return {
    type: VIEW_VIDEO,
    id,
  };
}

export function clearViewData() {
  return {
    type: CLEAR_VIEW_DATA,
  };
}

export function starVideo(id) {
  DataBase.starVideo(id);
  return {
    type: STAR_VIDEO,
    id,
  };
}

export function unStarVideo(id) {
  DataBase.unStarVideo(id);
  return {
    type: UN_STAR_VIDEO,
    id,
  };
}
