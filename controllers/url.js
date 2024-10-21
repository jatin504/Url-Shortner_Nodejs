const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURl(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = shortid.generate(8);

  await URL.create({
    shortId: shortID,
    redirectURl: body.url,
    visitHistory: [],
  });
  return res.render('home', {
    id: shortID
  })
  // return res.json({ id: shortID });
}

async function handleGetAnalatycs(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURl,
  handleGetAnalatycs,
};
