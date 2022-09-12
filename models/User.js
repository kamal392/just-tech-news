// importing Model class and datatype object from sequelize
const{Model, DataTypes }= require('sequelize');
const sequelize = require('../config/connection');

// create our User model

class User extends Model{}




// define the table and columns and configuration 
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    // define an id column
    id:{
        // use the special sequelize datatype object provide what type of data it is 
        type:DataTypes.INTEGER,
        //this is the equivalent of Sql's `NOT NULL` option
        allowNull:false,
        //  instruct that this is th primary key
        primaryKey:true,
        // turn on the increment
        autoIncrement:true
    },
    // define a username column
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    // define an email
   email:{
     type:DataTypes.STRING,
     allowNull:false,
    //  there can not be a duplicate value in this table
    unique:true,
    // if allowNull is set to false , we can run our data through validators before creating the table data 
    validate:{
        isEmail: true
    }

   },
    // Define a password column
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            // this means the password must be at least four characters
            len:[4]
        }
    } 
  },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE(https://sequelize.org/v5/manual/models-definition.html#configuration))
    // pass in our imported sequelize connection(the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/UpdatedAt timestamp fileds
    timestamps:false,
    // don't pluralize name of database table
    freezeTableName:true,
    // use underscore instead of camel-casing (i.e `comment_text and not `commentText`)
    underscored:true,
    // make it so our model name stays lowercase in the database
    modelName:`user`
}
);




module.exports = User;