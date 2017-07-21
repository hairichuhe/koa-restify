module.exports = function(sequelize, DataTypes) {
  var Privilege = sequelize.define("Privilege", {
    id:{type:DataTypes.BIGINT(11), autoIncrement:true, primaryKey : true, unique : true},
    code: { type: DataTypes.STRING,  allowNull: false, comment:'编号' },
    name: { type: DataTypes.STRING,  allowNull: false, comment:'角色名' },
    ico: { type: DataTypes.STRING, comment:'图标样式' },
    url: { type: DataTypes.STRING, comment:'链接地址'},
    parentid: { type: DataTypes.BIGINT(11), comment:'上级权限id'},
    createuser: { type: DataTypes.BIGINT(11), comment:'创建人'},
    updateuser: { type: DataTypes.BIGINT(11), comment:'更新人'}
  }, {
    classMethods: {
      associate: function(models) {
        Privilege.belongsToMany(models.Role, {through: 'tb_role_privilege', as:'RolePrivilege'});
      }
    },
    timestamps: true,
    underscored: true,
    paranoid: false,
    freezeTableName: true,
    tableName: 'tb_privilege',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  return Privilege;
};