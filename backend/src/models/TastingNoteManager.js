const AbstractManager = require("./AbstractManager");

class TastingNoteManager extends AbstractManager {
  constructor() {
    super({ table: "tasting_note" });
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
