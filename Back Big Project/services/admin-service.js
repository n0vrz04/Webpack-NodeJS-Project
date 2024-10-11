const baseService = require("./base-service");

const getAdminPage = async () => {
  const result = await baseService.getAllJSONData();
  return result.menu;
};

module.exports = {
  getAdminPage
};
