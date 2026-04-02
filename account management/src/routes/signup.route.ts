import { Router } from "express";
import { pool } from "../db/client";
import { hashPassword } from "../utils/bcrypt";

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, email, hashedPassword]
    );

    return res.json({
      message: "User created",
      user: result.rows[0],
    });

  } catch (err: any) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

export default router;