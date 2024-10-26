const { Redis } = require("../helper/RedisUtil");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expired = process.env.JWT_EXPIRED;

const verifyJwt = (req, token) => {
  try {
    let decoded = jwt.verify(token, secret);

    return true;
  } catch (err) {
    return false;
  }
};

const createJwtToken = () => {
  return jwt.sign({ data: 'data' }, secret, { expiresIn: expired });
};

const updateJwtToken = async (token) => {
  const redisClient = await Redis.getClient();
  await redisClient.set(`betest_token`, token, {
    EX: parseInt(process.env.REDIS_TTL),
  });
}

const deleteJwtToken = async (userId) => {
  const redisClient = await Redis.getClient();
  await redisClient.del(`betest_token_${userId}`);
}

const getJwtToken = async () => {
  const redisClient = await Redis.getClient();
  return await redisClient.get(`betest_token`);
}

module.exports = { verifyJwt, createJwtToken, updateJwtToken, getJwtToken, deleteJwtToken };
