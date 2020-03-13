module.exports = {
    roles: [
        'user',
        'admin'
    ],
    permissions: {
        'user': [
            'read',
            'create',
            'update'
        ],
        'producer': [
            'read',
            'create',
            'update',
            'delete'
        ],
    },
    grants: {
        'user': [
            `read:producer`,
            `create:producer`,
            `update:producer`,
            `delete:producer`,
        ],
        'admin': [
            'user',
            'read:user',
            'create:user',
            'update:user',
        ]
    },
    delimiter: ':',
};