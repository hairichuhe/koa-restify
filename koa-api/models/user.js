module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id:{type:DataTypes.BIGINT(11), autoIncrement:true, primaryKey : true, unique : true},
    username: { type: DataTypes.STRING,  allowNull: false, comment:'用户名' ,unique : true},
    password: { type: DataTypes.STRING, allowNull: false, comment:'用户密码' },
    realname: { type: DataTypes.STRING, allowNull:false, comment:'用户真实名'},
    mobile: { type: DataTypes.STRING, comment:'手机号'},
    email: { type: DataTypes.STRING, comment:'邮箱'},
    imgsrc: { type: DataTypes.STRING, defaultValue:'/img/user.png', comment:'头像路径'},
    description: { type: DataTypes.TEXT, comment:'描述'},
    createuser: { type: DataTypes.BIGINT(11), comment:'创建人'},
    updateuser: { type: DataTypes.BIGINT(11), comment:'更新人'}
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Role, {through: 'tb_user_role', as:'UserRole'});
      }
    },
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tb_user',
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  return User;
};
