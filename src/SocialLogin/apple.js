import { platform, registerCb, webToNativeIos } from "../utills";
/**
 * This function handles native apple login
 * @param {object} options
 * @example wtn.socialLogin.apple.login({
 *  callback:(data)=>{
 *    console.log(data);
 *  }
 * });
 */
export const login = (options) => {
	if (["ANDROID_APP", "IOS_APP"].includes(platform)) {
		const { callback, scope } = options;

		registerCb((response) => {
			const { type } = response;
			if (type === "appleLoginToken") {
				callback && callback(response);
			}
		});
		platform === "IOS_APP" &&
			webToNativeIos.postMessage({
				action: "appleSignIn",
				scope,
			});
	}
};
