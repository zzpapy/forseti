<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200908161817 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE scm ADD company_name VARCHAR(255) NOT NULL, ADD address VARCHAR(255) NOT NULL, ADD city VARCHAR(255) NOT NULL, ADD accounting_exercice_start_at DATETIME NOT NULL, ADD accounting_exercice_end_at DATETIME NOT NULL, ADD local_owner VARCHAR(255) NOT NULL, ADD local_siren VARCHAR(255) NOT NULL, ADD type_tenant_owner VARCHAR(255) NOT NULL, ADD amount_previous_year_accounting_charge INT NOT NULL, ADD forecast_charge INT NOT NULL, ADD phone INT DEFAULT NULL, DROP raison_sociale, DROP adresse, DROP ville, DROP debut_ex_compta, DROP fin_ex_compta, DROP proprieter_local, DROP siren_local, DROP type_occup, DROP mt_loyer_annu, DROP mt_prev_charges, DROP total_charge_annee_precedente, CHANGE siret siret VARCHAR(255) NOT NULL, CHANGE siren siren VARCHAR(255) NOT NULL, CHANGE cp zip_code INT NOT NULL, CHANGE telephone amount_anually_rent INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE scm ADD raison_sociale VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD adresse VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD cp INT NOT NULL, ADD ville VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD debut_ex_compta DATETIME NOT NULL, ADD fin_ex_compta DATETIME NOT NULL, ADD proprieter_local VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD siren_local BIGINT NOT NULL, ADD type_occup TINYINT(1) NOT NULL, ADD mt_loyer_annu DOUBLE PRECISION NOT NULL, ADD mt_prev_charges DOUBLE PRECISION NOT NULL, ADD total_charge_annee_precedente DOUBLE PRECISION DEFAULT NULL, ADD telephone INT DEFAULT NULL, DROP company_name, DROP address, DROP zip_code, DROP city, DROP accounting_exercice_start_at, DROP accounting_exercice_end_at, DROP local_owner, DROP local_siren, DROP type_tenant_owner, DROP amount_anually_rent, DROP amount_previous_year_accounting_charge, DROP forecast_charge, DROP phone, CHANGE siret siret BIGINT NOT NULL, CHANGE siren siren BIGINT NOT NULL');
    }
}
