const { Unauthorized } = require("../helper/ResponseUtil");
const { verifyJwt, getJwtToken } = require("../helper/JwtUtil");

const getToken = (bearer) => {
  return bearer.slice(7, bearer.length);
};

const JwtFilter = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = await getToken(req.headers.authorization);

    if (verifyJwt(req, token)) {
      if (process.env.ENV != "test") {
        // Cek token DB
        let redisToken = await getJwtToken();
        if (redisToken == null) {
          Unauthorized(res, "Sesi anda sudah berakhir, silahkan login kembali");
        } else if (redisToken != token) {
          Unauthorized(
            res,
            "Sepertinya anda telah login di tab atau browser lain. Untuk tetap login, pastikan hanya login disalah satu tab atau browser"
          );
        } else {
          next();
        }
      } else {
        next();
      }
    } else {
      Unauthorized(res, "Token tidak valid");
    }
  } else {
    Unauthorized(res, "Token tidak ada");
  }
};

module.exports = { JwtFilter };
