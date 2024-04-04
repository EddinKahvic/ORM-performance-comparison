DROP PROCEDURE IF EXISTS insert_cat_leo_25000;
DROP PROCEDURE IF EXISTS insert_owner_harold_davis_25000;
DROP PROCEDURE IF EXISTS insert_visit_with_date_25000;
DROP PROCEDURE IF EXISTS insert_visit_owner_jean_coleman_25000;

DELIMITER $$
CREATE PROCEDURE insert_cat_leo_25000()
BEGIN
    DECLARE i INT DEFAULT 0;
    WHILE i < 25000 DO
        INSERT IGNORE INTO pets VALUES (0, 'Leo', '2000-09-07', 1, 1);
        SET i = i + 1;
    END WHILE;
END$$


CREATE PROCEDURE insert_owner_harold_davis_25000()
BEGIN
    DECLARE i INT DEFAULT 0;
    WHILE i < 25000 DO
        INSERT IGNORE INTO owners VALUES (0, 'Harold', 'Davis', '563 Friendly St.', 'Windsor', '6085553198');
        SET i = i + 1;
    END WHILE;
END$$


CREATE PROCEDURE insert_visit_with_date_25000()
BEGIN
    DECLARE i INT DEFAULT 0;
    WHILE i < 25000 DO
        INSERT IGNORE INTO visits VALUES (0, 6, '2010-03-05', 'rabies shot');
        SET i = i + 1;
    END WHILE;
END$$


CREATE PROCEDURE insert_visit_owner_jean_coleman_25000()
BEGIN
    DECLARE i INT DEFAULT 0;
    WHILE i < 25000 DO
        INSERT IGNORE INTO visits VALUES (0, 7, '2009-06-04', 'neutered');
        SET i = i + 1;
    END WHILE;
END$$

DELIMITER ;