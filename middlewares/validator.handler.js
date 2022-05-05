const boom = require('@hapi/boom');

function validatorHandler(schema, property){
  /**
   * Closures en JS
   * crear una funcion de forma dinamica
   */
  return (req,res,next) => {
    const data = req[property];
    const { error } = schema.validate(data, {abortEarly:false});
    if(error){
      next(boom.badRequest());
    }
    next();
  }
}
module.exports = validatorHandler;
