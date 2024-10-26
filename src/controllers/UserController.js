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
const UserService = require("../services/UserService");
const { Redis } = require("../helper/RedisUtil");

class UserController {
    static async createUser(req, res, next) {
        const body = req.body;
        try {
            const newUser = await UserService.createUser(body);
            //flagging if any users created, it will update the getAllUsers in Redis next hit
            req.app.local = false;
            return Ok(res, `User Berhasil dibuat`, newUser);
        } catch (err) {
            console.log("----------------------", getTimestamp());
            console.log("membuat user", err)
            InternalServerErr(res, "Error saat membuat user")
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const redisClient = await Redis.getClient();
            let result;
            if (req.app.local) {
                result = await redisClient.get(`All_Users`);
            } else {
                result = await UserService.getAllUsers();

                await redisClient.set(`users`, JSON.stringify(result), {
                    EX: parseInt(process.env.REDIS_TTL),
                });

                if (result.length == 0) {
                    await redisClient.set(`users`, 'EMPTY', {
                        EX: parseInt(process.env.REDIS_TTL),
                    });
                    return NotFound(res, GetMsg("not.found"));
                }

                return Ok(res, `User Berhasil ditampilkan`, result);
            }
            if (result == 'EMPTY' || result == null) {
                return NotFound(res, GetMsg("not.found"));
            } else {
                return Ok(res, `User Berhasil ditampilkan`, result);
            }

        } catch (err) {
            console.log("----------------------", getTimestamp());
            console.log("getAllUsers", err)
            InternalServerErr(res, "Error saat menampilkan user")
        }
    }

    static async getUserById(req, res, next) {
        try {
            let user = await UserService.getUserById(req.query.id);
            if (!user) {
                return NotFound(res, GetMsg("not.found"));
            }
            return Ok(res, `User Berhasil ditampilkan`, user);
        } catch (err) {
            console.log("----------------------", getTimestamp());
            console.log("getUserById", err);
            InternalServerErr(res, "Error saat mendapatkan user by id")
        }
    }

    static async getUserByIdentityNumber(req, res, next) {
        const { identityNumber } = req.query
        try {
            let user = await UserService.getUserByIdentityNumber(identityNumber);
            if (!user) {
                return NotFound(res, GetMsg("not.found"));
            }
            return Ok(res, `User Berhasil ditampilkan`, user);
        } catch (err) {
            console.log("----------------------", getTimestamp());
            console.log("getUserByIdentityNumber", err);
            InternalServerErr(res, "Error saat mendapatkan user by identityNumber")
        }
    }

    static async getUserByAccountNumber(req, res, next) {
        const { accountNumber } = req.query
        try {
            let user = await UserService.getUserByAccountNumber(accountNumber);
            if (!user) {
                return NotFound(res, GetMsg("not.found"));
            }

            return Ok(res, `User Berhasil ditampilkan`, user);
        } catch (err) {
            console.log("----------------------", getTimestamp());
            console.log("getUserByAccountNumber", err);
            InternalServerErr(res, "Error saat mendapatkan user by accountNumber")
        }
    }

    static async updateUser(req, res, next) {
        let body = req.body
        try {
            let user = await UserService.getUserById(body.id);
            if (!user) {
                return NotFound(res, GetMsg("not.found"));
            }

            await UserService.updateUser(body.id, body);
            //flagging if any users updated, it will update the getAllUsers in Redis next hit
            req.app.local = false;

            return Ok(res, GetMsg("updated"));
        } catch (err) {
            console.log("----------------------", getTimestamp());
            console.log("updateUser", err)
            InternalServerErr(res, "Error saat mendapatkan user by id")
        }
    }

    static async deleteUser(req, res, next) {
        let body = req.body
        try {
            let user = await UserService.getUserById(body.id);
            if (!user) {
                return NotFound(res, GetMsg("not.found"));
            }

            await UserService.deleteUser(body.id);

            //flagging if any users deleted, it will update the getAllUsers in Redis next hit
            req.app.local = false;

            return Ok(res, GetMsg("deleted"));
        } catch (err) {
            console.log("----------------------", getTimestamp());
            console.log("deleteUser", err)
            InternalServerErr(res, "Error saat menghapus user by id")
        }
    }
}

module.exports = UserController;