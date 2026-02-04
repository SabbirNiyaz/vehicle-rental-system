import bcrypt from "bcryptjs";
import { pool } from "../config/db";


const getUser = async (user: { id: number; role: "admin" | "customer" }) => {

    if (user.role === "customer") {
        const result = await pool.query(`
            SELECT * 
            FROM users
            WHERE id=$1`, [user.id]);
        return result;
    }

    const result = await pool.query(`
        SELECT id, name, email, phone, role
        FROM users`);

    return result;
}

const getSingleUser = async (id: string) => {
    const result = await pool.query(`
        SELECT id, name, email, phone, role
        FROM users WHERE id = $1`, [id]);
    return result;
}

const updateUser = async (userId: string, payload: Record<string, unknown>,
    user: { id: number; role: "admin" | "customer" }) => {

    const { name, email, password, phone, role } = payload;

    const hashedPass = await bcrypt.hash(password as string, 10)

    const findUser = await pool.query(`SELECT * FROM users WHERE id = $1`,
        [userId]);

    if (findUser.rows.length === 0) {
        throw new Error("No user found");
    }

    // Customer update logic
    if (user.role === "customer") {
        if (findUser.rows[0].id !== user.id) {
            throw new Error("Unauthorized update request");
        }

        const userUpdateResult = await pool.query(`
        UPDATE users
        SET name=$1, email=$2, password=$3, phone=$4
        WHERE id =$5 
        RETURNING id, name, email, phone, role`,
            [name, email, hashedPass, phone, userId]);

        return userUpdateResult.rows[0];
    }

    // Admin update logic
    if (user.role === "admin") {
        const userUpdateResult = await pool.query(`
        UPDATE users
        SET name=$1, email=$2, password=$3, phone=$4, role=$5
        WHERE id =$6 
        RETURNING id, name, email, phone, role`,
            [name, email, hashedPass, phone, role, userId]);

        return userUpdateResult.rows[0];
    }

}

const deleteUser = async (id: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id =$1`, [id]);
    return result;
}


export const userServices = {
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}