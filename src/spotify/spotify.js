export const authEndPoint = "https://accounts.spotify.com/authorize";
export const redirectUri = "https://music-player-app-dd145.web.app/";
export const spotifyLogoutURL = "https://www.spotify.com/logout/";
export const loginTokenURL = "https://music-server-node-spot.herokuapp.com/login";
export const refreshTokenURL = "https://music-server-node-spot.herokuapp.com/refresh";
const clientId = "25c4582018f14ff8ad9c57698a4d43d0";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
];


// export const getTokenFromUrl = () => {
//   return window.location.hash
//     .substring(1)
//     .split('&')
//     .reduce((initial, item) => {
//       let parts = item.split("=");
//       initial[parts[0]] = decodeURIComponent(parts[1]);
//       return initial;
//     }, {});
// }

export const loginUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=code`;
