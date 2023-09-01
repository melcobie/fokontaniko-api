import oracledb = require('oracledb');
import { dbconfig } from '../data-source';

const connect = async () => {
    return oracledb.getConnection(dbconfig);
}

const selectQueryConfig = {
    resultSet: true,
    outFormat: oracledb.OUT_FORMAT_OBJECT
};

const outputInsertConfig =  { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }

export default {
    connect,
    selectQueryConfig,
    outputInsertConfig,
};