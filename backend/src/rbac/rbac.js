const { queryBuilder } = require("../db");

let rbacConfig = {
    roles: [],
    permissions: {},
    grants: {}
};

async function can({ roleId, action, resource }) {
    /* select * from `permissions` as `p` inner join `grants` as `g` on `p`.`id` = `g`.`permission_id` 
                                          inner join `roles` as `r` on `r`.`id` = `g`.`role_id` or `r`.`id` = `g`.`sub_role_id` 
                                          where `p`.`resource` = ? and `p`.`action` = ? and `r`.`role_name` = ? */
    const allow = 1;
    try {
        const ret = await queryBuilder("permissions as p")
            .count("* as TOTAL")
            .innerJoin("grants as g", "p.id", "g.permission_id")
            .innerJoin("roles as r", function() {
                this.on("r.id", "g.role_id").orOn("r.id", "g.sub_role_id");
            })
            .where("p.resource", resource)
            .andWhere("p.action", action)
            .andWhere("r.id", roleId);

        console.log("RBAC", roleId, action, resource, ret[0].TOTAL);
        return parseInt(ret[0].TOTAL) === allow;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    can
};
