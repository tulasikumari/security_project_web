// middleware/auditLogger.js

const AuditLog = require('../models/AuditLog');

const auditLogger = async (req, res, next) => {
  const userId = req.user ? req.user._id : null; // Assuming you have a user in the request object after authentication
  const action = req.method;
  const resource = req.originalUrl;
  const changes = JSON.stringify(req.body);
  const ipAddress = req.ip;

  const auditLog = new AuditLog({
    userId,
    action,
    resource,
    changes,
    ipAddress,
  });

  await auditLog.save();
  next();
};

module.exports = auditLogger;
