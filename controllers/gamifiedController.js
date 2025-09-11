import prisma from "../lib/db.js";

const createPlaybook = async (req, res) => {
  try {
    const { title, content, source } = req.body;
    if (!title || !content) return res.status(400).json({ message: "title and content are required" });
    const pb = await prisma.playbook.create({ data: { title, content, source: (source || "local").toLowerCase(), createdById: req.user?.id || null } });
    return res.status(201).json({ playbook: { id: pb.id } });
  } catch (e) { return res.status(500).json({ message: "Internal Server Error" }); }
};

const listPlaybooks = async (_req, res) => {
  try {
    const items = await prisma.playbook.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true, content: true, source: true } });
    return res.status(200).json({ playbooks: items });
  } catch (e) { return res.status(500).json({ message: "Internal Server Error" }); }
};

const createStory = async (req, res) => {
  try {
    const { title, content, source } = req.body;
    if (!title || !content) return res.status(400).json({ message: "title and content are required" });
    const st = await prisma.story.create({ data: { title, content, source: (source || "local").toLowerCase(), createdById: req.user?.id || null } });
    return res.status(201).json({ story: { id: st.id } });
  } catch (e) { return res.status(500).json({ message: "Internal Server Error" }); }
};

const listStories = async (_req, res) => {
  try {
    const items = await prisma.story.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true, content: true, source: true } });
    return res.status(200).json({ stories: items });
  } catch (e) { return res.status(500).json({ message: "Internal Server Error" }); }
};

const createTestimonial = async (req, res) => {
  try {
    const { content, authorName } = req.body;
    if (!content) return res.status(400).json({ message: "content is required" });
    const ts = await prisma.testimonial.create({ data: { content, authorName: authorName || null, userId: req.user?.id || null } });
    return res.status(201).json({ testimonial: { id: ts.id } });
  } catch (e) { return res.status(500).json({ message: "Internal Server Error" }); }
};

const listTestimonials = async (_req, res) => {
  try {
    const items = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, content: true, authorName: true } });
    return res.status(200).json({ testimonials: items });
  } catch (e) { return res.status(500).json({ message: "Internal Server Error" }); }
};

export { createPlaybook, listPlaybooks, createStory, listStories, createTestimonial, listTestimonials };


