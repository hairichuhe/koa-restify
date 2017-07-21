module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    id:{type:DataTypes.BIGINT(11), autoIncrement:true, primaryKey : true, unique : true},
    name: { type: DataTypes.STRING,  allowNull: false, comment:'角色名' },
    chinesename: { type: DataTypes.STRING, allowNull: false, comment:'角色中文名' },
    description: { type: DataTypes.TEXT, comment:'描述'},
    createuser: { type: DataTypes.BIGINT(11), comment:'创建人'},
    updateuser: { type: DataTypes.BIGINT(11), comment:'更新人'}
  }, {
    classMethods: {
      associate: function(models) {
        Role.belongsToMany(models.User, {through: 'tb_user_role', as:'UserRole'});
        Role.belongsToMany(models.Privilege, {through: 'tb_role_privilege', as:'RolePrivilege'});
      }
    },
    timestamps: true,
    underscored: true,
    paranoid: false,
    freezeTableName: true,
    tableName: 'tb_role',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  return Role;
};