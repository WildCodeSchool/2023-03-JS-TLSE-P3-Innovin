const pool = require("../models");

const findTastingSheetsDatas = (req, res) => {
  pool
    .query(
      `SELECT
    oa.id,
    oa.intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM
    inovin.olfactive_intensityAromas oa
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    oc.complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM
    inovin.olfactive_complexity oc
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    vc.color,
    vc.img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM inovin.visual_color vc
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    vl.limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM
    inovin.visual_limpidity vl
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    vb.brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM
    inovin.visual_brightness vb
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    vt.tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM inovin.visual_tears vt
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    ti.intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM inovin.taste_intensity ti
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    tmf.mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM
    inovin.taste_mouth_feel tmf
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    ta.alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM inovin.taste_alcohol ta
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    ac.acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM inovin.acidity ac
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    ts.sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM inovin.taste_sweetness ts
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    tt.taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    NULL AS intensity
FROM inovin.taste_tannin tt
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    oa.aromas,
    oa.img_url,
    NULL AS flavor,
    NULL AS intensity
FROM
    inovin.olfactive_aromas oa
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    tf.flavor,
    NULL AS intensity
FROM inovin.taste_flavor tf
UNION ALL
SELECT
    NULL AS id,
    NULL AS intensity_aromas,
    NULL AS complexity,
    NULL AS color,
    NULL AS img_color,
    NULL AS limpidity,
    NULL AS brightness,
    NULL AS tears,
    NULL AS intensity,
    NULL AS mouth_feel,
    NULL AS alcohol,
    NULL AS acidity,
    NULL AS sweetness,
    NULL AS taste_tannin,
    NULL AS aromas,
    NULL AS img_url,
    NULL AS flavor,
    vi.intensity
FROM
    inovin.visual_intensity vi;`
    )
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  findTastingSheetsDatas,
};
