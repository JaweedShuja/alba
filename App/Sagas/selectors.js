export const typeOfUser = (state) => state.appData.isTeacher;
export const currentCategoryIdForTeacher = (state) =>
  state.appData.getCategoriesData;
export const categories = (state) => state.appData.getCategoriesData;
export const currentCategoryId = (state) => state.appData.currentCategoryId;
export const deviceInfo = (state) => state.startUp.deviceInfo;
