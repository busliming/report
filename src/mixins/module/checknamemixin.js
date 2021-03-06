export default {
  methods: {
    confirm_checkname_params(str, maxlength, minlength, name) {
      str = str.trim();
      maxlength = maxlength || 64;
      minlength = minlength || 4;
      name = name.trim() || "名称";
      return [str, maxlength, minlength, name];
    },
    check_ifempty(str) {
      let check = false;
      str = str.trim();
      if (str) {
        check = true;
      }
      return check;
    },
    check_name_base(str, maxlength, minlength, name) {
      let check = false;
      [str, maxlength, minlength, name] = this.confirm_checkname_params(
        str,
        maxlength,
        minlength,
        name
      );

      return check;
    },
    check_name_module1(str, maxlength, minlength, name) {
      let check = false;
      [str, maxlength, minlength, name] = this.confirm_checkname_params(
        str,
        maxlength,
        minlength,
        name
      );

      return check;
    },
    check_name_with_pattern_and_message(
      str,
      maxlength,
      minlength,
      name,
      pattern,
      message
    ) {
      let check = false;
      [str, maxlength, minlength, name] = this.confirm_checkname_params(
        str,
        maxlength,
        minlength,
        name
      );
      console.log(pattern,message)
      return check;
    }
  }
};
