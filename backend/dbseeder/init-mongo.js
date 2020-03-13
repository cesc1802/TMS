db.createUser({
    user: "admin",
    pwd: "etc12345",
    roles: [
        {
            role: "readWrite",
            db: "TMS"
        }
    ]
});

db.users.insert([
    {
        id: 1,
        username: "root",
        password:
            "$2b$10$59NzybJ5NFwpCxY2QUuSvuIkF.7iSYVrmlPI/VeE/sKWKGSAdvYTy",
        roleId: "",
        createdAt: new Date()
    },
    {
        id: 2,
        username: "admin",
        password:
            "$2b$10$59NzybJ5NFwpCxY2QUuSvuIkF.7iSYVrmlPI/VeE/sKWKGSAdvYTy",
        roleId: "",
        createdAt: new Date()
    }
]);

db.roles.insert(
    {
        id: 1,
        roleName: "admin",
        createdAt: new Date()
    },
    {
        id: 2,
        roleName: "user",
        createdAt: new Date()
    }
);

db.resources.insert({
    id: 1,
    resourceName: "user",
    createdAt: new Date()
});

db.permissions.insert({
    id: 1,
    resourceId: 1,
    actions: ["create", "read", "update", "delete"],
    createdAt: new Date()
});

db.grants.insert(
    {
        id: 1,
        roleId: 1, //not null
        subRoleId: "", //allow null
        permissionId: "",
        createdAt: new Date()
    },
    {
        id: 2,
        roleId: 1,
        subRoleId: "",
        permissionId: "",
        createdAt: new Date()
    },
    {
        id: 3,
        roleId: 1,
        subRoleId: "",
        permissionId: "",
        createdAt: new Date()
    }
);
