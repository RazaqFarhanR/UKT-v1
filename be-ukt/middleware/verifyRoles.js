const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const userRoles = req.user.role
        const result = rolesArray.includes(userRoles);
        console.log(result);
        if(!result) return res.sendStatus(403).send("Forbidden! You don't have permission");
        next();
    }
}

module.exports = verifyRoles