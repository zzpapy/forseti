<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200914090840 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE bank_account (id INT AUTO_INCREMENT NOT NULL, scm_id INT NOT NULL, bank_name VARCHAR(255) NOT NULL, bankin_id INT NOT NULL, logo_url VARCHAR(255) DEFAULT NULL, bankin_account_id INT DEFAULT NULL, account_name VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_53A23E0AB2AAE0AD (scm_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bank_account ADD CONSTRAINT FK_53A23E0AB2AAE0AD FOREIGN KEY (scm_id) REFERENCES scm (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE bank_account');
    }
}
