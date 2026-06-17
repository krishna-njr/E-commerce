import jwt from "jsonwebtoken";

const verifyToken = (token, type) => {
  try {
    if (type === "access") {
      const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
      return payload;
    } else if (type === "refresh") {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
      return payload;
    }
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export default verifyToken;
