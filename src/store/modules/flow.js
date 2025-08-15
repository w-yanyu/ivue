import MyAxios from "pte-ui/utils/MyAxios";

let flow = {
  state: {
    currentEditAtrr: {},
  },
  mutations: {
    SET_EDIT_ATTR(state, data) {
      if (data.params && !Array.isArray(data.params)) {
        data.params = JSON.parse(data.params);
      }
      let currentPropertiesList;
      if (data.customProperties) {
        currentPropertiesList = JSON.parse(
          data.customProperties.replace(/&quot;/g, '"')
        );
        currentPropertiesList.forEach(async (item) => {
          if (item.textType === "dynamicSelect" && item.dynamicUrl) {
            let params = {};
            item.selectData.map((item) => {
              params[item.valueField] = item.displayField;
            });
            await MyAxios.invokeAPI(
              `/gateway${item.dynamicUrl}`,
              "post",
              params
            ).then((response) => {
              item.selectData = response.data;
            });
            console.log(item);
          }
          if (item.textType === "switch") {
            item.selectData.forEach((it) => {
              if (it.switchValue) {
                item.activeValue = it.valueField;
                item.activeText = it.displayField;
              } else {
                item.inactiveValue = it.valueField;
                item.inactiveText = it.displayField;
              }
            });
          }
        });
        data.currentPropertiesReq = currentPropertiesList.filter((item) => {
          return item.attributeType === "request";
        });
        data.currentPropertiesRes = currentPropertiesList.filter((item) => {
          return item.attributeType === "response";
        });
      }
      state.currentEditAtrr = data;
    },
  },
  actions: {},
};
export default flow;
