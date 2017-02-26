import * as firebase from "firebase";

export default class DataBase {
  static readVideos(callback) {
    firebase.database().ref('videos').orderByKey().once('value', (videos) => {
      let items = [];
      videos.forEach((v) => {
        items.push({
          id: Number(v.key),
          url: v.val().url,
          star: v.child('stars').val() && v.child('stars').val().count || 0,
          view: v.child('views').val() && v.child('views').val().count || 0,
        });
      })
      callback(items.reverse());
    });
  }

  static starVideo(id) {
    firebase.database().ref(`videos/${id}/stars`).transaction((star) => {
      star && star.count++;
      return star;
    })
  }

  static unStarVideo(id) {
    firebase.database().ref(`videos/${id}/stars`).transaction((star) => {
      star && star.count--;
      return star;
    })
  }
}
