PRAGMA foreign_keys = ON;

CREATE TABLE users(
	  username VARCHAR(20) NOT NULL,
	  fullname VARCHAR(40) NOT NULL,
	  baseState INT NOT NULL,
	  PRIMARY KEY(username)
);
