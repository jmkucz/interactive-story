using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SQLite;
using Microsoft.Data.Sqlite;

namespace ApiTrapped 
{
    public class Repository
    {            
        public PlayerData getPlayerData(string username)
        {
            PlayerData playerData = new PlayerData();
            using (var connection = new SqliteConnection("Data Source=trapped.sqlite3"))
            {
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText =
                @"
                    SELECT *
                    FROM users
                    WHERE username = $id
                ";
                command.Parameters.AddWithValue("$id", username);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        playerData.username = reader.GetString(0);
                        playerData.fullname = reader.GetString(1);
                        playerData.currentLevel = reader.GetInt32(2);
                        if (playerData.username != null)
                        {
                            playerData.authentic = true;
                        }
                        else
                        {
                            playerData.authentic = false;
                        }
                    }
                }
            }
            return playerData;
        }

        public bool addUser(string username)
        {
            var taken = false;
            using (var connection = new SqliteConnection("Data Source=trapped.sqlite3"))
            {
                connection.Open();

                var checkCommand = connection.CreateCommand();
                checkCommand.CommandText =
                @"
                    SELECT *
                    FROM users
                    WHERE username = $id
                ";
                checkCommand.Parameters.AddWithValue("$id", username);

                using (var reader = checkCommand.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var exists = reader.GetString(0);
                        if (exists != null)
                        {
                            taken = true;
                        }
                    }
                }
                if (!taken)
                {
                    var command = connection.CreateCommand();
                    command.CommandText =
                    @"
                    INSERT INTO users
                    (username, fullname, baseState)
                    VALUES ($id, $fullname, $baseState)
                    ";
                    command.Parameters.AddWithValue("$id", username);
                    command.Parameters.AddWithValue("$fullname", " ");
                    command.Parameters.AddWithValue("$baseState", 0);

                    command.ExecuteNonQuery();
                }
            }
            return taken;
        }
    }
}
