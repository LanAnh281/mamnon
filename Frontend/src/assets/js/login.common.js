import moment from "moment-timezone";
import loginService from "../../service/login.service";

export const setLocalStrorage = (token, permissionName, expiresIn) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("permissionName", permissionName);
    localStorage.setItem("userName", permissionName);
    localStorage.setItem("expiresIn", expiresIn);
};
export const cleanLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("permissionName");
    localStorage.removeItem("userName");
    localStorage.removeItem("expiresIn");
};
export const checkAccessToken = async (router) => {
    const currentTime = moment();
    if (currentTime.isBefore(moment(localStorage.getItem("expiresIn")))) return;
    const document = await loginService.accessToken();
    if (document["status"] == "fail") {
        console.log("refreshToken hết hạn");
        cleanLocalStorage();
        await loginService.clearRefreshToken();
        router.push({ name: "login" });
    } else {
        console.log("refresh token còn hạn");
        setLocalStrorage(
            document["token"],
            document["permissionName"],
            document["expiresIn"]
        );
    }
};

export const checkCookieExistence = (cookieName) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
            return true;
        }
    }
    return false;
};
export const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
export const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
            return value;
        }
    }

    return null;
};

export const clearCookieValue = () => {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        console.log("name cookie:", name);
        document.cookie =
            name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    return null;
};