const yup = require("yup");
const { REG_EXP_ADDRESS } = require("../constants");

module.exports = {
  registerPublicAddressSchema: yup.object().shape({
    params: yup.object({
      publicAddress: yup
        .string()
        .matches(REG_EXP_ADDRESS, "Address is not valid!")
        .required("Field is required!"),
    }),
  }),
  loginSchema: yup.object().shape({
    params: yup.object({
      publicAddress: yup
        .string()
        .matches(REG_EXP_ADDRESS, "Address is not valid!")
        .required("Field is required!"),
    }),
    body: yup.object({
      signature: yup.string().required("Field is required!"),
    }),
  }),
};
