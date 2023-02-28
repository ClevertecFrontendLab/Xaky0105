export const Regex = {
  passwordBase: /(?=.*[a-zA-Z0-9]{6,})/,
  passwordUpperLetter: /(?=.*[A-Z])/,
  passwordMinOneNum: /(?=.*[0-9])/,
  loginLetter: /(?=.*[a-zA-Z]).{1,}/,
  loginNumber: /(?=.*\d).{1,}/,
  phone:
    /^\+?375((\s\(33\)\s\d{3}-\d{2}-\d{2})|(\s\(29\)\s\d{3}-\d{2}-\d{2})|(\s\(44\)\s\d{3}-\d{2}-\d{2})|(\s\(25\)\s\d{3}-\d{2}-\d{2}))\s*$/,
}
