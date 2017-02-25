import * as firebase from "firebase";

export default class DataBase {
  static readVideos(callback) {
    firebase.database().ref('videos').on('value', (videos) => {
      let items = [];
      videos.forEach((v) => {
        items.push({
          id: v.key,
          url: v.val().url,
          star: v.child('stars').val().count,
          date: v.val().date
        });
      })
      callback(items);
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
