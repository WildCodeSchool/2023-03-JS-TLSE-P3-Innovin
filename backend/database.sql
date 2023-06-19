-- MySQL Script generated by MySQL Workbench

-- Thu Jun 15 10:14:09 2023

-- Model: New Model    Version: 1.0

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=1;

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------

-- Schema inovin

-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `inovin` DEFAULT CHARACTER SET utf8 ;

USE `inovin` ;

-- -----------------------------------------------------

-- Table `inovin`.`wine_region`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`wine_region` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(55) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`grape_variety`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`grape_variety` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(45) NOT NULL,
        `description` VARCHAR(300) NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

INSERT INTO
    inovin.grape_variety (name, description)
VALUES (
        'Cabernet Sauvignon',
        'Le Cabernet Sauvignon est un cépage de vin rouge populaire, connu pour ses arômes de cassis et ses tanins robustes.'
    ), (
        'Merlot',
        'Le Merlot est un cépage de vin rouge polyvalent, offrant des saveurs de fruits rouges mûrs et une texture douce.'
    ), (
        'Pinot Noir',
        'Le Pinot Noir est un cépage de vin rouge délicat, avec des arômes de cerise et une acidité vive.'
    ), (
        'Syrah',
        'La Syrah, également connue sous le nom de Shiraz, est un cépage de vin rouge audacieux, offrant des saveurs de baies sombres et des notes poivrées.'
    ), (
        'Grenache',
        'La Grenache est un cépage de vin rouge utilisé principalement en assemblage, apportant des arômes de fruits rouges et une douceur en bouche.'
    );

-- -----------------------------------------------------

-- Table `inovin`.`existing_wine`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`existing_wine` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `vintage` INT NOT NULL,
        `blend` VARCHAR(45) NULL,
        `color` VARCHAR(45) NOT NULL,
        `alcohol_pourcentage` INT NOT NULL,
        `picture` LONGTEXT NULL,
        `description` LONGTEXT NULL,
        `name` VARCHAR(45) NULL,
        `id_wine_region` INT NOT NULL,
        `winery` VARCHAR(255) NOT NULL,
        `id_grape_variety` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_existing_wine_wine_Region1` FOREIGN KEY (`id_wine_region`) REFERENCES `inovin`.`wine_region` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_existing_wine_grape_variety1` FOREIGN KEY (`id_grape_variety`) REFERENCES `inovin`.`grape_variety` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`appellation`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`appellation` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `nom` VARCHAR(45) NULL,
        `label` VARCHAR(45) NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`user`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `firstname` VARCHAR(45) NOT NULL,
        `lastname` VARCHAR(45) NOT NULL,
        `birth_date` DATE NOT NULL,
        `email` VARCHAR(45) NOT NULL,
        `hashed_password` VARCHAR(255) NOT NULL,
        `admin_credentials` TINYINT NOT NULL DEFAULT 0,
        `wine_color` VARCHAR(45) NULL,
        `preference_description` LONGTEXT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`workshop`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`workshop` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `date` DATE NOT NULL,
        `place` VARCHAR(45) NOT NULL,
        `commentary` LONGTEXT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`olfactive_intensityAromas`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`olfactive_intensityAromas` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `intensity_aromas` VARCHAR(55) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`olfactive_complexity`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`olfactive_complexity` (
        `id` INT NOT NULL,
        `complexity` VARCHAR(45) NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`visual_color`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`visual_color` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `color` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`visual_limpidity`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`visual_limpidity` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `limpidity` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`visual_brightness`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`visual_brightness` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `brightness` VARCHAR(45) NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`visual_tears`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`visual_tears` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `tears` VARCHAR(45) NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`taste_intensity`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`taste_intensity` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `intensity` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`taste_mouth_feel`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`taste_mouth_feel` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `mouth_feel` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`taste_alcohol`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`taste_alcohol` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `alcohol` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`acidity`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`acidity` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `acidity` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`taste_sweetness`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`taste_sweetness` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `sweetness` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`taste_tannin`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`taste_tannin` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `taste_tannin` VARCHAR(45) NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`tasting_note`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`tasting_note` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `wine_quality` VARCHAR(45) NOT NULL,
        `id_olfactive_intensity` INT NOT NULL,
        `id_user` INT NOT NULL,
        `selected_wine` TINYINT(1) NOT NULL,
        `rating` DECIMAL(10) NULL,
        `olfactive_complexity_id` INT NOT NULL,
        `visual_color_id` INT NOT NULL,
        `visual_limpidity_id` INT NOT NULL,
        `visual_brightness_id` INT NOT NULL,
        `visual_tears_id` INT NOT NULL,
        `taste_intensity_id` INT NOT NULL,
        `taste_mouth_feel_id` INT NOT NULL,
        `taste_alcohol_id` INT NOT NULL,
        `acidity_id` INT NOT NULL,
        `taste_sweetness_id` INT NOT NULL,
        `taste_tannin_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_tasting_note_olfactif_intensityAromas1` FOREIGN KEY (`id_olfactive_intensity`) REFERENCES `inovin`.`olfactive_intensityAromas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_user1` FOREIGN KEY (`id_user`) REFERENCES `inovin`.`user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_olfactive_complexity1` FOREIGN KEY (`olfactive_complexity_id`) REFERENCES `inovin`.`olfactive_complexity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_visual_color1` FOREIGN KEY (`visual_color_id`) REFERENCES `inovin`.`visual_color` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_visual_limpidity1` FOREIGN KEY (`visual_limpidity_id`) REFERENCES `inovin`.`visual_limpidity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_visual_brightness1` FOREIGN KEY (`visual_brightness_id`) REFERENCES `inovin`.`visual_brightness` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_visual_tears1` FOREIGN KEY (`visual_tears_id`) REFERENCES `inovin`.`visual_tears` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_taste_intensity1` FOREIGN KEY (`taste_intensity_id`) REFERENCES `inovin`.`taste_intensity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_taste_mouth_feel1` FOREIGN KEY (`taste_mouth_feel_id`) REFERENCES `inovin`.`taste_mouth_feel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_taste_alcohol1` FOREIGN KEY (`taste_alcohol_id`) REFERENCES `inovin`.`taste_alcohol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_acidity1` FOREIGN KEY (`acidity_id`) REFERENCES `inovin`.`acidity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_taste_sweetness1` FOREIGN KEY (`taste_sweetness_id`) REFERENCES `inovin`.`taste_sweetness` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_taste_tannin1` FOREIGN KEY (`taste_tannin_id`) REFERENCES `inovin`.`taste_tannin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`competition_selection`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`competition_selection` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `commentary` LONGTEXT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`new_wine`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`new_wine` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `color` VARCHAR(45) NOT NULL,
        `commentary` LONGTEXT NULL,
        `id_competition_selection` INT NOT NULL,
        `id_tasting_note` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_nouveau_vin_selection_concours1` FOREIGN KEY (`id_competition_selection`) REFERENCES `inovin`.`competition_selection` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_new_wine_tasting_note1` FOREIGN KEY (`id_tasting_note`) REFERENCES `inovin`.`tasting_note` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`olfactive_aromas`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`olfactive_aromas` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `aromas` VARCHAR(55) NOT NULL,
        `img_url` LONGTEXT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`workshop_has_existingWine`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`workshop_has_existingWine` (
        `id_workshop` INT NOT NULL,
        `id_existing_wine` INT NOT NULL,
        CONSTRAINT `fk_Degustation_has_vin_existant_Degustation1` FOREIGN KEY (`id_workshop`) REFERENCES `inovin`.`workshop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_Degustation_has_vin_existant_vin_existant1` FOREIGN KEY (`id_existing_wine`) REFERENCES `inovin`.`existing_wine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`tastingnote_has_existingwine`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`tastingnote_has_existingwine` (
        `id_tasting_note` INT NOT NULL,
        `id_existing_wine` INT NOT NULL,
        CONSTRAINT `fk_fiche_degustation_has_vin_existant_fiche_degustation1` FOREIGN KEY (`id_tasting_note`) REFERENCES `inovin`.`tasting_note` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_fiche_degustation_has_vin_existant_vin_existant1` FOREIGN KEY (`id_existing_wine`) REFERENCES `inovin`.`existing_wine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`user_has_workshop`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`user_has_workshop` (
        `id_user` INT NOT NULL,
        `id_workshop` INT NOT NULL,
        CONSTRAINT `fk_CANDIDAT_has_Degustation_CANDIDAT1` FOREIGN KEY (`id_user`) REFERENCES `inovin`.`user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_CANDIDAT_has_Degustation_Degustation1` FOREIGN KEY (`id_workshop`) REFERENCES `inovin`.`workshop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`olfactive_aromas_has_tasting_note`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`olfactive_aromas_has_tasting_note` (
        `id_olfactive` INT NOT NULL,
        `id_tasting_note` INT NOT NULL,
        CONSTRAINT `fk_Olfactif_aromas_has_tasting_note_Olfactif_aromas1` FOREIGN KEY (`id_olfactive`) REFERENCES `inovin`.`olfactive_aromas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_Olfactif_aromas_has_tasting_note_tasting_note1` FOREIGN KEY (`id_tasting_note`) REFERENCES `inovin`.`tasting_note` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`taste_flavor`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`taste_flavor` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `flavor` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`tasting_note_has_taste_flavor`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`tasting_note_has_taste_flavor` (
        `id_tasting_note` INT NOT NULL,
        `id_taste_flavor` INT NOT NULL,
        CONSTRAINT `fk_tasting_note_has_taste_flavor_tasting_note1` FOREIGN KEY (`id_tasting_note`) REFERENCES `inovin`.`tasting_note` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_tasting_note_has_taste_flavor_taste_flavor1` FOREIGN KEY (`id_taste_flavor`) REFERENCES `inovin`.`taste_flavor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`existing_wine_has_appellation`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`existing_wine_has_appellation` (
        `id_existing_wine` INT NOT NULL,
        `id_appellation` INT NOT NULL,
        CONSTRAINT `fk_existing_wine_has_appellation_existing_wine1` FOREIGN KEY (`id_existing_wine`) REFERENCES `inovin`.`existing_wine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_existing_wine_has_appellation_appellation1` FOREIGN KEY (`id_appellation`) REFERENCES `inovin`.`appellation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`selected_wine`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`selected_wine` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `dosage` DECIMAL(5, 1) NULL,
        `id_new_wine` INT NOT NULL,
        `id_tasting_note` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_selected_wine_new_wine1` FOREIGN KEY (`id_new_wine`) REFERENCES `inovin`.`new_wine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_selected_wine_tasting_note1` FOREIGN KEY (`id_tasting_note`) REFERENCES `inovin`.`tasting_note` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `inovin`.`visual_intensity`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `inovin`.`visual_intensity` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `intensity` VARCHAR(45) NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

SET SQL_MODE=Traditional;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;