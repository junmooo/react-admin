# database 12345678

CREATE TABLE hello.`user` (
	`index` BIGINT auto_increment NOT NULL,
	username varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	email varchar(100) NULL,
	create_time varchar(100) NULL,
	del BOOL NULL,
	remark varchar(100) NULL,
	additional varchar(100) NULL,
	CONSTRAINT user_PK PRIMARY KEY (`index`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
CREATE INDEX user_index_IDX USING BTREE ON hello.`user` (`index`,username);
