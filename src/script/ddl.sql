CREATE SCHEMA bms;

CREATE TABLE bms.app_audit (
	audit_id serial NOT NULL,
	audit_action varchar(100) NOT NULL,
	audit_data json NULL,
	audit_by varchar(50) NOT NULL,
	audit_on timestamp NOT NULL,
	audit_status varchar(50) NULL,
	audit_error json NULL,
	CONSTRAINT app_audit_pkey PRIMARY KEY (audit_id)
);

CREATE TABLE bms.role (
	id serial NOT NULL,
	name varchar(100) NOT NULL,
	CONSTRAINT role_name_key UNIQUE (name),
	CONSTRAINT role_pkey PRIMARY KEY (id)
);


CREATE TABLE bms.user (
	id serial NOT NULL,
	username varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	active int2 NULL DEFAULT 1,
	created_on timestamp NULL,
	created_by varchar(100) NULL,
    updated_on timestamp NULL,
	updated_by varchar(100) NULL,
	role_id int4  NOT NULL,
	CONSTRAINT user_role_id_fkey FOREIGN KEY (role_id) REFERENCES bms.role (id),
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY (id),
	CONSTRAINT user_username_key UNIQUE (username)
);


CREATE TABLE bms.book (
	id serial NOT NULL,
	title varchar(300) NOT NULL,
	description varchar(1000) NULL,
	author varchar(50) NOT NULL,
	publisher varchar(50) NOT NULL,
	pages int4 NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	user_id int4 not null,
	CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES bms.user (id),
	CONSTRAINT book_pkey PRIMARY KEY (id)
);

CREATE TABLE bms.store (
	id serial NOT NULL,
	name varchar(100) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	address varchar(200) NOT NULL,
	user_id int4 not null,
	CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES bms.user (id),
	CONSTRAINT store_pkey PRIMARY KEY (id)
);
