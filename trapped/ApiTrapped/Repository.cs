using System;

public class Repository
{
	public Repository()
	{
		public getPlayerData()
        {
            PlayerData playerData;
            using (var connection = new SqliteConnection("Data Source=trapped.db"))
            {
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText =
                @"
                    SELECT name
                    FROM user
                    WHERE id = $id
                ";
                command.Parameters.AddWithValue("$id", id);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        playerData = reader.GetString(0);

                        Console.WriteLine($"Hello!");
                    }
                }
            }
        }
	}
}
