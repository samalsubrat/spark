import prisma from "../lib/db.js";

const createHotspot = async (req, res) => {
  try {
    if (!req.user || !["admin", "leader"].includes(req.user.role)) {
      return res.status(403).json({ message: "forbidden" });
    }
    const { name, description, location, latitude, longitude } = req.body;
    if (!name || !location) {
      return res
        .status(400)
        .json({ message: "name and location are required" });
    }
    const lat = typeof latitude === "number" ? latitude : undefined;
    const lng = typeof longitude === "number" ? longitude : undefined;
    const hotspot = await prisma.hotspot.create({
      data: {
        name,
        description: description || null,
        location,
        latitude: lat ?? null,
        longitude: lng ?? null,
        createdById: req.user.id,
      },
    });
    return res.status(201).json({ hotspot: { id: hotspot.id } });
  } catch (error) {
    console.error("createHotspot error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const listHotspots = async (_req, res) => {
  try {
    const hotspots = await prisma.hotspot.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        latitude: true,
        longitude: true,
      },
    });
    return res.status(200).json({ hotspots });
  } catch (error) {
    console.error("listHotspots error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createHotspot, listHotspots };
