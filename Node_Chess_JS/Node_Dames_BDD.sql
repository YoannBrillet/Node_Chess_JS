/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Yoann
 * Created: 19 mai 2017
 */

CREATE DATABASE IF NOT EXISTS Node_Dames_BDD;
USE Node_Dames_BDD;

CREATE TABLE IF NOT EXISTS joueurs(
'id' INT(3) NOT NULL AUTO_INCREMENT,
'pseudo' VARCHAR(25) NOT NULL,
'score' INT(9),
PRIMARY KEY ('id')
)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

INSERT INTO 'joueurs' ('id', 'pseudo', 'score') VALUES 
(1, 'God', 999999999),
(2, 'Diblux', 0),
(3, 'Couruss', 0),
(4, 'Testman', 0);
