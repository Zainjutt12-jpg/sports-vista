import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertTeamPlayersToRelation1726358400000 implements MigrationInterface {
    name = 'ConvertTeamPlayersToRelation1726358400000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS team_players (
                playerId INT NOT NULL AUTO_INCREMENT,
                teamId INT NOT NULL,
                playerName VARCHAR(255) NOT NULL,
                rosterOrder INT NOT NULL,
                PRIMARY KEY (playerId),
                UNIQUE KEY UQ_team_players_roster (teamId, rosterOrder),
                CONSTRAINT FK_team_players_team
                    FOREIGN KEY (teamId) REFERENCES playerTeams(teamId)
                    ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            INSERT INTO team_players (teamId, playerName, rosterOrder)
            SELECT teamId, player1, 1 FROM playerTeams WHERE player1 IS NOT NULL AND TRIM(player1) <> ''
            UNION ALL
            SELECT teamId, player2, 2 FROM playerTeams WHERE player2 IS NOT NULL AND TRIM(player2) <> ''
            UNION ALL
            SELECT teamId, player3, 3 FROM playerTeams WHERE player3 IS NOT NULL AND TRIM(player3) <> ''
            UNION ALL
            SELECT teamId, player4, 4 FROM playerTeams WHERE player4 IS NOT NULL AND TRIM(player4) <> ''
            UNION ALL
            SELECT teamId, player5, 5 FROM playerTeams WHERE player5 IS NOT NULL AND TRIM(player5) <> ''
            UNION ALL
            SELECT teamId, player6, 6 FROM playerTeams WHERE player6 IS NOT NULL AND TRIM(player6) <> ''
            UNION ALL
            SELECT teamId, player7, 7 FROM playerTeams WHERE player7 IS NOT NULL AND TRIM(player7) <> ''
        `);

        await queryRunner.query(`
            ALTER TABLE playerTeams
                DROP COLUMN player1,
                DROP COLUMN player2,
                DROP COLUMN player3,
                DROP COLUMN player4,
                DROP COLUMN player5,
                DROP COLUMN player6,
                DROP COLUMN player7
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE playerTeams
                ADD COLUMN player1 VARCHAR(255) NOT NULL DEFAULT '',
                ADD COLUMN player2 VARCHAR(255) NOT NULL DEFAULT '',
                ADD COLUMN player3 VARCHAR(255) NOT NULL DEFAULT '',
                ADD COLUMN player4 VARCHAR(255) NOT NULL DEFAULT '',
                ADD COLUMN player5 VARCHAR(255) NOT NULL DEFAULT '',
                ADD COLUMN player6 VARCHAR(255) NOT NULL DEFAULT '',
                ADD COLUMN player7 VARCHAR(255) NOT NULL DEFAULT ''
        `);

        for (let rosterOrder = 1; rosterOrder <= 7; rosterOrder++) {
            await queryRunner.query(`
                UPDATE playerTeams team
                INNER JOIN team_players player
                    ON player.teamId = team.teamId AND player.rosterOrder = ?
                SET team.player${rosterOrder} = player.playerName
            `, [rosterOrder]);
        }

        await queryRunner.query(`DROP TABLE IF EXISTS team_players`);
    }
}
