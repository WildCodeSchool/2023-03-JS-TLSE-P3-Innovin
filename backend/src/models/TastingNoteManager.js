const AbstractManager = require("./AbstractManager");

class TastingNoteManager extends AbstractManager {
  constructor() {
    super({ table: "tasting_note" });
  }

  findTastingNoteById(idUser, idWorkshop) {
    return this.database.query(
      `SELECT
      tn.id,
      tn.wine_quality, 
      tn.rating, 
      tn.tasting_commentary, 
      oi.intensity_aromas,
      oc.complexity,
      vc.color,
      vi.intensity AS visual_intensity,
      vl.limpidity,
      vb.brightness,
      vt.tears,
      oa.aromas,
      ti.intensity AS taste_intensity,
      tmf.mouth_feel,
      ta.alcohol,
      ac.acidity,
      ts.sweetness,
      tt.taste_tannin,
      tf.flavor
    FROM
    ${this.table} tn
    JOIN
      tasting_note_has_taste_flavor tnhtf ON tnhtf.id_tasting_note = tn.id
    JOIN
      taste_flavor tf ON tnhtf.id_taste_flavor = tf.id
    JOIN
      olfactive_aromas_has_tasting_note oahtn ON oahtn.id_tasting_note = tn.id
    JOIN
      olfactive_aromas oa ON oahtn.id_olfactive = oa.id
    JOIN
      olfactive_intensityAromas oi ON oi.id = tn.id_olfactive_intensity
    JOIN
      olfactive_complexity oc ON oc.id = tn.olfactive_complexity_id
    JOIN
      visual_color vc ON vc.id = tn.visual_color_id
    JOIN
      visual_intensity vi ON vi.id = tn.visual_intensity_id
    JOIN
      visual_limpidity vl ON vl.id = tn.visual_limpidity_id
    JOIN
      visual_brightness vb ON vb.id = tn.visual_brightness_id
    JOIN
      visual_tears vt ON vt.id = tn.visual_tears_id
    JOIN
      taste_intensity ti ON ti.id = tn.taste_intensity_id
    JOIN
      taste_mouth_feel tmf ON tmf.id = tn.taste_mouth_feel_id
    JOIN
      taste_alcohol ta ON ta.id = tn.taste_alcohol_id
    JOIN
      acidity ac ON ac.id = tn.acidity_id
    JOIN
      taste_sweetness ts ON ts.id = tn.taste_sweetness_id
    JOIN
      taste_tannin tt ON tt.id = tn.taste_tannin_id
    JOIN
      user u ON u.id = tn.id_user
    JOIN
      user_has_workshop uhw ON uhw.id_user = u.id
    JOIN
      workshop w ON w.id = uhw.id_workshop
    WHERE
      tn.id_user = ?
      AND w.id = ?`,
      [idUser, idWorkshop]
    );
  }

  insert(tastingNote) {
    const {
      idAcidity,
      idOlfactiveComplexity,
      idOlfactiveIntensity,
      idTasteAlcohol,
      idTasteIntensity,
      idTasteMouthFeel,
      idTasteSweetness,
      idTasteTannin,
      idUser,
      idVisualBrightness,
      idVisualColor,
      idVisualIntensity,
      idVisualLimpidity,
      idVisualTears,
      rating,
      selectedWine,
      tastingCommentary,
      wineQuality,
    } = tastingNote;
    return this.database.query(
      `insert into ${this.table} (wine_quality, id_olfactive_intensity, id_user, selected_wine, rating, tasting_commentary, olfactive_complexity_id, visual_color_id, visual_intensity_id, visual_limpidity_id, visual_brightness_id, visual_tears_id, taste_intensity_id,taste_mouth_feel_id, taste_alcohol_id, acidity_id, taste_sweetness_id, taste_tannin_id ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        wineQuality,
        idOlfactiveIntensity,
        idUser,
        selectedWine,
        rating,
        tastingCommentary,
        idOlfactiveComplexity,
        idVisualColor,
        idVisualIntensity,
        idVisualLimpidity,
        idVisualBrightness,
        idVisualTears,
        idTasteIntensity,
        idTasteMouthFeel,
        idTasteAlcohol,
        idAcidity,
        idTasteSweetness,
        idTasteTannin,
      ]
    );
  }
}

module.exports = TastingNoteManager;
