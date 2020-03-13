const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const query = require("../db/queries");
const userBaseQuery = require("../db/user");
const utils = require("../lib/utils");

async function getAll() {
    try {
        const applyGetAll = query.getAll();
        const results = await applyGetAll(userBaseQuery());
        return results;
    } catch (error) {
        throw error;
    }
}

async function register({ username, password, roleId }) {
    try {
        const isUsernameExists = await userBaseQuery().where(
            "username",
            username
        );

        if (isUsernameExists.length > 0) {
            throw new Error(`user name ${username} is already taken`);
        } else {
            const successed = await userBaseQuery().insert({
                username,
                password: brcypt.hashSync(password, 10),
                role_id: roleId
            });

            if (successed > 0) {
                const results = await countTotalAndGetRecordPerPage({
                    page: 0,
                    page_size: 4
                });
                return results;
            }
        }
    } catch (error) {
        throw error;
    }
}

async function login({ username, password }) {
    try {
        const user = await userBaseQuery()
            .select("password", "role_id")
            .where("username", username)
            .limit(1);

        if (
            user[0] !== undefined &&
            brcypt.compareSync(password, user[0].password)
        ) {
            const token = utils.genToken({
                userId: user[0].id,
                roleId: user[0].role_id
            });
            return token;
        } else {
            throw new Error("Username or Password is incorrect");
        }
    } catch (error) {
        throw error.message;
    }
}

async function deleteById({ id }) {
    try {
        const numOfRowEffect = await userBaseQuery()
            .whereIn("id", id.split(","))
            .del();

        if (numOfRowEffect >= 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                page_size: 4
            });
            return results;
        }
    } catch (error) {
        throw error;
    }
}

async function updateById({ id, username, password, role_id }) {
    const values = {
        username,
        password: brcypt.hashSync(password, 10),
        role_id
    };
    try {
        const applyUpdateById = users.updateById(id, values);
        const numOfRowEffect = await applyUpdateById(userBaseQuery());
        if (numOfRowEffect > 0) {
            const results = await getAll();
            return results;
        }
    } catch (error) {
        throw error;
    }
}

async function countTotalRecord() {
    try {
        const results = await query.countTotalRecord()(userBaseQuery());
        return results[0].TOTAL;
    } catch (err) {
        throw err;
    }
}

async function getRecordPerPage({ page, page_size }) {
    try {
        const results = await userBaseQuery()
            .select("u.id", "u.username", "r.role_name", "u.created_at")
            .from("users as u")
            .leftJoin("roles as r", "r.id", "u.role_id")
            .limit(page_size)
            .offset(page * page_size)
            .orderBy("created_at", "DESC");

        return results;
    } catch (err) {
        throw err;
    }
}

async function countTotalAndGetRecordPerPage({ page, page_size }) {
    try {
        let usersPromise = getRecordPerPage({ page, page_size });
        let totalRecordPromise = countTotalRecord();

        const [users, totalRecord] = [
            await usersPromise,
            await totalRecordPromise
        ];
        return {
            users,
            totalRecord
        };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAll,
    register,
    login,
    deleteById,
    updateById,
    countTotalAndGetRecordPerPage
};
