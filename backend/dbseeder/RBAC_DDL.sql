CREATE TABLE IF NOT EXISTS roles (
id int PRIMARY KEY AUTO_INCREMENT,
role_name varchar(50) unique NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
id int PRIMARY KEY AUTO_INCREMENT,
username varchar(45) NOT NULL,
password varchar(255) NOT NULL,
role_id int NOT NULL,
FOREIGN KEY(role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS permissions (
id int PRIMARY KEY AUTO_INCREMENT,
resource varchar(100) NOT NULL,
action varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS grants (
id int PRIMARY KEY AUTO_INCREMENT,
role_id int NOT NULL,
sub_role_id int NOT NULL,
permission_id int NOT NULL,
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(permission_id) REFERENCES permissions(id),
FOREIGN KEY(sub_role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS resources (
id int PRIMARY KEY AUTO_INCREMENT,
resource_name varchar(100) NOT NULL
)

create table if not exists actions (
    id int PRIMARY key AUTO_INCREMENT,
    action_name varchar(100) not null,
    created_at TIMESTAMP not null default current_timestamp
)

insert into resources(resource_name) values ('users') 
insert into resources(resource_name) values ('roles') 
insert into resources(resource_name) values ('grants') 
insert into resources(resource_name) values ('permissions') 
insert into resources(resource_name) values ('resources')

insert into actions(action_name) values ('read')
insert into actions(action_name) values ('create')
insert into actions(action_name) values ('update')
insert into actions(action_name) values ('delete')

alter table permissions add resource_id int;
alter table permissions modify resource_id int not null;
alter table permissions add foreign key (resource_id) references resources(id);
alter table permissions add constraint UK_PERMISSION unique (resource, action);
alter table permissions drop index UK_PERMISSION;
alter table permissions add constraint UK_PERMISSION unique (action_id, resource_id)
alter table resources add constraint UK_RESOURECE unique (resource_name);

alter table permissions add action_id int not null; 
alter table permissions add foreign key (action_id) references actions(id);

alter table permissions add created_at TIMESTAMP NOT NULL default current_timestamp;
alter table grants add created_at TIMESTAMP not null default current_timestamp;
alter table resources add created_at TIMESTAMP not null default current_timestamp;
alter table roles add created_at TIMESTAMP not null default current_timestamp;
alter table users add created_at TIMESTAMP not null default current_timestamp;

alter table grants add constraint UK_GRANT unique(role_id, sub_role_id, permission_id);
alter table users add constraint UK_USER unique (username);


select count(*) from permissions as p inner join grants as g on g.permission_id = p.id where p.resource = 'roles' and p.action = 'read';

select count(*) from permissions as p inner join grants as g on g.permission_id = p.id 
inner join roles as r on r.id = g.role_id or r.id = g.sub_role_id
where p.resource = 'roles' and p.action = 'read' and r.role_name = 'admin';

select * from grants as g left join roles as r on r.id = g.role_id left join permissions as p on p.id = g.permission_id where g.role_id = 1;

update permissions set action_id = 1 where action = 'read';
update permissions set action_id = 2 where action = 'create';
update permissions set action_id = 3 where action = 'update';
update permissions set action_id = 4 where action = 'delete';


update permissions set resource_id = 1 where resource = 'users';
update permissions set resource_id = 2 where resource = 'roles';
update permissions set resource_id = 3 where resource = 'grants';
update permissions set resource_id = 4 where resource = 'permissions';
update permissions set resource_id = 5 where resource = 'resources';