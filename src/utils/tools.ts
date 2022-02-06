export const serverUrl = "http://localhost:1337"

export const uploadUrl = serverUrl + "/api/v1/common/upload_file";

export const setToken = (token: string) =>
  sessionStorage.setItem("token", token);

export const getToken = () => sessionStorage.getItem("token");

export const removeToken = () => sessionStorage.removeItem("token");

export const dalImg = (url: string | undefined) => {
  if (url) {
    if (url.startsWith("http")) {
      return url;
    }
    return serverUrl + url;
  }
  return "http://oss.penkuoer.com/uPic/ss.jpeg";
};

