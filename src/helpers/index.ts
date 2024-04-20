import crypto from "crypto";

const SECRET = "aojs)@uaskCAD34QUj@#";
export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (password: string) => {
  return crypto.createHmac("sha256", password).update(SECRET).digest("hex");
};
