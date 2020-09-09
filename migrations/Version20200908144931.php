<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200908144931 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE scm (id INT AUTO_INCREMENT NOT NULL, logo VARCHAR(255) DEFAULT NULL, raison_sociale VARCHAR(255) NOT NULL, adresse VARCHAR(255) NOT NULL, cp INT NOT NULL, ville VARCHAR(255) NOT NULL, siret BIGINT NOT NULL, siren BIGINT NOT NULL, debut_ex_compta DATETIME NOT NULL, fin_ex_compta DATETIME NOT NULL, ref_local VARCHAR(255) NOT NULL, invariant_local VARCHAR(255) NOT NULL, proprieter_local VARCHAR(255) NOT NULL, siren_local BIGINT NOT NULL, type_occup TINYINT(1) NOT NULL, mt_loyer_annu DOUBLE PRECISION NOT NULL, mt_prev_charges DOUBLE PRECISION NOT NULL, total_charge_annee_precedente DOUBLE PRECISION DEFAULT NULL, min_assoc INT NOT NULL, max_assoc INT NOT NULL, telephone INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('DROP TABLE config');
        $this->addSql('ALTER TABLE charge ADD scm_id INT NOT NULL');
        $this->addSql('ALTER TABLE charge ADD CONSTRAINT FK_556BA434B2AAE0AD FOREIGN KEY (scm_id) REFERENCES scm (id)');
        $this->addSql('CREATE INDEX IDX_556BA434B2AAE0AD ON charge (scm_id)');
        $this->addSql('ALTER TABLE user ADD scm_id INT NOT NULL, CHANGE is_active is_active TINYINT(1) DEFAULT \'0\' NOT NULL, CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649B2AAE0AD FOREIGN KEY (scm_id) REFERENCES scm (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649B2AAE0AD ON user (scm_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE charge DROP FOREIGN KEY FK_556BA434B2AAE0AD');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649B2AAE0AD');
        $this->addSql('CREATE TABLE config (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, value LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, description VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE scm');
        $this->addSql('DROP INDEX IDX_556BA434B2AAE0AD ON charge');
        $this->addSql('ALTER TABLE charge DROP scm_id');
        $this->addSql('DROP INDEX IDX_8D93D649B2AAE0AD ON user');
        $this->addSql('ALTER TABLE user DROP scm_id, CHANGE is_active is_active TINYINT(1) DEFAULT \'0\', CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP');
    }
}
