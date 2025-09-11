import prisma from "../lib/db.js";

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

    if (req.user.role !== "asha") {
      return res.status(403).json({ message: "forbidden" });
    }

    const normalizedQuality = String(quality).toLowerCase();
    if (!["good", "medium", "high", "disease"].includes(normalizedQuality)) {
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

    if (normalizedQuality === "medium") {
      const leaders = await prisma.user.findMany({
        where: { role: "leader" },
        select: { id: true },
      });
      if (leaders.length > 0) {
        await prisma.leaderAlert.createMany({
          data: leaders.map((l) => ({
            leaderId: l.id,
            message: `Water quality medium at ${record.waterbodyName}`,
            waterTestId: record.id,
          })),
        });
      }
    } else if (normalizedQuality === "high") {
      await prisma.globalAlert.create({
        data: {
          message: `High risk water quality at ${record.waterbodyName}`,
          waterTestId: record.id,
        },
      });
    } else if (normalizedQuality === "disease") {
      // TODO: SMS broadcast to everyone (to be implemented)
      await prisma.globalAlert.create({
        data: {
          message: `Disease detected in water at ${record.waterbodyName}`,
          waterTestId: record.id,
        },
      });
      // SMS sending will be implemented.
    }

    return res.status(201).json({ waterTest: { id: record.id } });
  } catch (error) {
    console.error("createWaterTest error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createWaterTest };
