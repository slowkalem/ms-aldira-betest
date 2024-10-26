const {
    Ok,
    BadRequest,
    InternalServerErr,
    NotFound,
    SearchOk,
    SearchNotFound,
} = require("../helper/ResponseUtil");
const { GetMsg } = require("../helper/MessageUtil");
const { getTimestamp } = require("../helper/StringUtil");
const { createJwtToken, updateJwtToken } = require("../helper/JwtUtil");

class AuthController {
    static async generateJWT(req, res, next) {
        try {
            const token = createJwtToken();

            // Update token di redis
            await updateJwtToken(token);

            return Ok(res, 'Berhasil generate Token', token);
        } catch (err) {
            console.log("----------------------", getTimestamp());
            console.log("generateJWT", err)
            InternalServerErr(res, "Error generate token")
        }
    }
}

module.exports = AuthController;