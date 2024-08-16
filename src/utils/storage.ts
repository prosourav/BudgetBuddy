import { setCookie, parseCookies, destroyCookie } from "nookies";

class Storage {

  save<T>(key: string, value: T) {
    setCookie(null, key, value as string, {
      maxAge:  365 * 24 * 60 * 60,
      path: '/',
    });
  };

  retrive(key: string) {
    const cookies = parseCookies();
    const specificCookie = cookies[key] && JSON.parse(cookies[key]);
    return specificCookie;
  };

   destroy(){
    const allCookies = parseCookies();
    Object.keys(allCookies).forEach(cookieName => {
      destroyCookie(null, cookieName, { path: '/' });
    });
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default new Storage();