export default async (req, res) => {
  try {
    res.status(200).json({ todo: "it works" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
