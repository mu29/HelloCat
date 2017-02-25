import DataBase from '../firebase/DataBase';

export const VIDEO_LIST_SUCCESS = 'VIDEO_LIST_SUCCESS';
export const STAR_VIDEO = 'STAR_VIDEO';
export const UN_STAR_VIDEO = 'UN_STAR_VIDEO';

const defaultState = {
  videos: [],
  stars: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case VIDEO_LIST_SUCCESS:
      return { ...state, videos: action.videos };
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
