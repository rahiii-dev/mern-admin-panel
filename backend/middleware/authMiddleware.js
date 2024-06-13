import { verifyToken } from "../utils/jwtUtils.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

export  const isAdmin = (req, res, next) => {
    if(req.user?.isAdmin){
        return next();
    }

    return res.status(403).json({message : "You are not autherized"});
}
