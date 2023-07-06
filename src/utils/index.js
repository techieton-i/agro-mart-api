const _= require('lodash');

exports.filterJwtPayload = (payload)=>{
    return _.pick(payload, ['_id', 'email', 'role'])
}