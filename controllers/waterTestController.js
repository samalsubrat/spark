import prisma from "../lib/db.js";
import { sendSMSWrapper } from "../lib/sms.js";

const createWaterTest = async (req, res) => {
  try {
    const {
      waterbodyName,
      waterbodyId,
      dateTime,
      location,
      latitude,
      longitude,
      photoUrl,
      notes,
      quality,
    } = req.body;

    if (
      !waterbodyName ||
      !dateTime ||
      !location ||
      !photoUrl ||
      !notes ||
      !quality
    ) {
      return res.status(400).json({
        message:
          "waterbodyName, dateTime, location, photoUrl, notes, quality are required",
      });
    }

    // Allow ASHA, LEADER or ADMIN to create
    if (!["asha", "admin", "leader"].includes(req.user.role)) {
      return res.status(403).json({ message: "forbidden" });
    }

    const normalizedQuality = String(quality).toLowerCase();
    if (!["good", "medium", "high"].includes(normalizedQuality)) {
      return res.status(400).json({ message: "invalid quality" });
    }

    const record = await prisma.waterTest.create({
      data: {
        waterbodyName,
        waterbodyId: waterbodyId || null,
        dateTime: new Date(dateTime),
        location,
        latitude: typeof latitude === "number" ? latitude : null,
        longitude: typeof longitude === "number" ? longitude : null,
        photoUrl,
        notes,
        quality: normalizedQuality,
        ashaId: req.user.id,
      },
    });

    const formattedDate = new Date(dateTime).toLocaleString("en-IN", {
      weekday: "short", // Thu
      day: "2-digit", // 11
      month: "short", // Sep
      year: "numeric", // 2025
      hour: "2-digit", // 03
      minute: "2-digit", // 30
      hour12: true, // AM/PM
      timeZone: "Asia/Kolkata", // Indian time zone
    });

    // ================= ALERT HANDLING =================
    if (normalizedQuality === "medium") {
      const leaders = await prisma.user.findMany({
        where: { role: "leader" },
        select: { id: true, number: true },
      });

      if (leaders.length > 0) {
        await prisma.leaderAlert.createMany({
          data: leaders.map((l) => ({
            leaderId: l.id,
            message: `⚠️ Medium Water Quality at ${record.waterbodyName}`,
            waterTestId: record.id,
          })),
        });
      }

      for (const leader of leaders) {
        if (leader.number) {
          const smsMessage = `⚠️ Medium Water Quality Alert
Waterbody: ${record.waterbodyName}
Location: ${location}
Date: ${formattedDate}`;
          await sendSMSWrapper(leader.number, smsMessage);
        }
      }
    } else if (normalizedQuality === "high") {
      await prisma.globalAlert.create({
        data: {
          message: `🚨 High Risk Water Quality detected at ${record.waterbodyName}`,
          waterTestId: record.id,
        },
      });

      const users = await prisma.user.findMany({
        select: { number: true },
      });

      for (const user of users) {
        if (user.number) {
          const smsMessage = `🚨 HIGH RISK ALERT
Waterbody: ${record.waterbodyName}
Location: ${location}
Date: ${formattedDate}`;
          await sendSMSWrapper(user.number, smsMessage);
        }
      }
    }

    return res.status(201).json({ waterTest: { id: record.id } });
  } catch (error) {
    console.error("createWaterTest error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateWaterTest = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      waterbodyName,
      waterbodyId,
      dateTime,
      location,
      latitude,
      longitude,
      photoUrl,
      notes,
      quality,
    } = req.body;
    const existing = await prisma.waterTest.findUnique({ where: { id } });
    if (!existing)
      return res.status(404).json({ message: "water test not found" });
    // Owner (asha) can update own; admin can update any
    if (!(req.user.role === "admin" || req.user.id === existing.ashaId)) {
      return res.status(403).json({ message: "forbidden" });
    }
    const data = {};
    if (waterbodyName) data.waterbodyName = waterbodyName;
    if (typeof waterbodyId !== "undefined")
      data.waterbodyId = waterbodyId || null;
    if (dateTime) data.dateTime = new Date(dateTime);
    if (location) data.location = location;
    if (typeof latitude === "number") data.latitude = latitude;
    if (typeof longitude === "number") data.longitude = longitude;
    if (photoUrl) data.photoUrl = photoUrl;
    if (notes) data.notes = notes;
    if (quality) {
      const q = String(quality).toLowerCase();
      if (!["good", "medium", "high"].includes(q))
        return res.status(400).json({ message: "invalid quality" });
      data.quality = q;
    }

    const updated = await prisma.waterTest.update({ where: { id }, data });
    return res.status(200).json({ waterTest: { id: updated.id } });
  } catch (error) {
    console.error("updateWaterTest error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteWaterTest = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.waterTest.findUnique({ where: { id } });
    if (!existing)
      return res.status(404).json({ message: "water test not found" });
    if (!(req.user.role === "admin" || req.user.id === existing.ashaId)) {
      return res.status(403).json({ message: "forbidden" });
    }
    await prisma.waterTest.delete({ where: { id } });
    return res.status(200).json({ deleted: true });
  } catch (error) {
    console.error("deleteWaterTest error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const listAllWaterTests = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "forbidden" });
    const items = await prisma.waterTest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ waterTests: items });
  } catch (error) {
    console.error("listAllWaterTests error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createWaterTest, updateWaterTest, deleteWaterTest, listAllWaterTests };
