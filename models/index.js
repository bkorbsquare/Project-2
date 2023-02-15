const User = require('./User');
const ChatSession = require('./ChatSession');

User.hasMany(ChatSession, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

ChatSession.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, ChatSession };