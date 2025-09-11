import bcrypt from "bcrypt";
import prisma from "../lib/db.js";

const ensureAdmin = (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "forbidden" });
  }
};

const createUser = async (req, res) => {
  try {
    if (ensureAdmin(req, res)) return;
    const { email, password, role, name } = req.body;
    if (!email || !password || !role)
      return res
        .status(400)
        .json({ message: "email, password, role are required" });
    if (
      !["asha", "leader", "admin", "public"].includes(
        String(role).toLowerCase()
      )
    )
      return res.status(400).json({ message: "invalid role" });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists)
      return res.status(409).json({ message: "email already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role: String(role).toLowerCase(),
        name: name || null,
      },
    });
    return res
      .status(201)
      .json({ user: { id: user.id, email: user.email, role: user.role } });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const listReports = async (req, res) => {
  try {
    if (ensureAdmin(req, res)) return;
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ reports });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const listWaterTests = async (req, res) => {
  try {
    if (ensureAdmin(req, res)) return;
    const tests = await prisma.waterTest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ waterTests: tests });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createUser, listReports, listWaterTests };
