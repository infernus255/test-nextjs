import cookie from "cookie";
export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}
export function parseJwt(token: string) {
  console.log(token);
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
