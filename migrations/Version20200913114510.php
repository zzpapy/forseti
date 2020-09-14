<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200913114510 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE api_user DROP FOREIGN KEY FK_AC64A0BA9D86650F');
        $this->addSql('DROP INDEX UNIQ_AC64A0BA9D86650F ON api_user');
        $this->addSql('ALTER TABLE api_user CHANGE user_id_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE api_user ADD CONSTRAINT FK_AC64A0BAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_AC64A0BAA76ED395 ON api_user (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE api_user DROP FOREIGN KEY FK_AC64A0BAA76ED395');
        $this->addSql('DROP INDEX UNIQ_AC64A0BAA76ED395 ON api_user');
        $this->addSql('ALTER TABLE api_user CHANGE user_id user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE api_user ADD CONSTRAINT FK_AC64A0BA9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_AC64A0BA9D86650F ON api_user (user_id_id)');
    }
}
