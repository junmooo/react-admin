# 控制台权限 角色信息表
CREATE TABLE hello.`CAUTH_ROLE_INFO` (
	`ROLE_ID` varchar(10) NOT NULL COMMENT '角色ID',
	`ROLE_NAME` varchar(300) NOT NULL COMMENT '角色名称',
	`REMARK` varchar(500) NULL COMMENT '备注信息',
	`DELETE_FLAG` varchar(1) NULL COMMENT '软删除标志：0-已删除，1-未删除',
	`TIME_CREATED` int NULL,
	`TIME_UPDATED` int NULL,
	`ROLE_CODE` varchar(300) NULL,
	CONSTRAINT CAUTH_ROLE_INFO_PK PRIMARY KEY (`ROLE_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '控制台权限 角色信息表';

# 控制台权限 资源定义表
CREATE TABLE hello.`CAUTH_RESOURCE_DEF` (
	`RESOURCE_ID` varchar(20) NOT NULL COMMENT '资源ID',
	`RESOURCE_NAME` varchar(100) NOT NULL COMMENT '资源名称',
	`PARENT_ID` varchar(20) COMMENT '父节点ID',
	`RESOURCE_PATH` varchar(500) COMMENT '路径',
	`MENU_FLAG` int NOT NULL COMMENT '是否菜单 0 - 否 1 - 是',
	`HAS_CHILD` int NOT NULL COMMENT '是否含有子节点 0 - 不含 1 - 含有  ',
	`SORT_NUM` int NOT NULL COMMENT '排序编号',
	`RESOURCE_CODE` varchar(1280) COMMENT '资源编码',
	`RESOURCE_URL` varchar(256),
	`REMARK` varchar(500) COMMENT '备注信息',
	`DELETE_FLAG` varchar(1) COMMENT '软删除标志：0-已删除，1-未删除',
	`TIME_CREATED` int,
	`TIME_UPDATED` int,
	CONSTRAINT `PK_CAUTH_RESOURCE_DEF` PRIMARY KEY (`RESOURCE_ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT '控制台权限 资源定义表';

# 控制台权限 操作员角色关系表
CREATE TABLE hello.`CAUTH_OPER_ROLE_REL` (
	`SQ` int NOT NULL COMMENT '流水号',
	`OPER_ID` varchar(6) NOT NULL COMMENT '操作员ID',
	`ROLE_ID` varchar(10) NOT NULL COMMENT '角色ID',
	`CREATED_TS` DATETIME NOT NULL COMMENT '创建时间',
	`LAST_UPD_TS` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '记录最后修改时间',
	`LAST_UPD_TRANCODE` varchar(6) COMMENT '最后修改交易码',
	`DELETE_FLAG` varchar(1) COMMENT '软删除标志：0-已删除，1-未删除'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT '控制台权限 操作员角色关系表';

# 控制台权限 操作员信息表
CREATE TABLE `hello`.`CAUTH_OPERATOR_INFO` (
	`OPER_ID` varchar(6) NOT NULL COMMENT '操作员ID',
	`OPER_PWD` varchar(150) COMMENT '操作员密码（请使用ID+密码加密存储）',
	`OPER_NAME` varchar(64) NOT NULL COMMENT '操作员姓名',
	`OPER_EMAIL` varchar(64) NOT NULL COMMENT '操作员Email',
	`PHONE_NO` varchar(11) COMMENT '手机号码',
	`OPER_STATUS` varchar(2) NOT NULL COMMENT '操作员状态:00-正常,01-锁定',
	`REMARK` varchar(2000) COMMENT '备注信息',
	`DELETE_FLAG` varchar(1) COMMENT '软删除标志：0-已删除，1-未删除',
	`TIME_CREATED` DATETIME,
	`TIME_UPDATED` DATETIME
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT '控制台权限 操作员信息表';

# 控制台权限 角色资源关系表
CREATE TABLE `hello`.`CAUTH_ROLE_RESOURCE_REL` (
	`SQ` int NOT NULL COMMENT '流水号',
	`ROLE_ID` varchar(10) NOT NULL COMMENT '角色ID',
	`RESOURCE_ID` varchar(20) NOT NULL COMMENT '资源ID',
	`DELETE_FLAG` varchar(1) COMMENT '软删除标志：0-已删除，1-未删除',
	`TIME_CREATED` int,
	`TIME_UPDATED` int
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT '控制台权限 角色资源关系表';

INSERT INTO
	CAUTH_RESOURCE_DEF (
		RESOURCE_ID,
		RESOURCE_NAME,
		PARENT_ID,
		RESOURCE_PATH,
		MENU_FLAG,
		HAS_CHILD,
		SORT_NUM,
		RESOURCE_CODE,
		RESOURCE_URL,
		REMARK,
		DELETE_FLAG,
		TIME_CREATED,
		TIME_UPDATED
	)
VALUES
(
		'05050301',
		'menu_button_new',
		'050503',
		'05_0505_050503_05050301',
		0,
		0,
		300,
		'/fusing/putErrorCodeFusing/SAVE',
		'/fusing/putErrorCodeFusing/SAVE',
		NULL,
		'1',
		1589526450,
		1589526450
	);