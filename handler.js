'use strict';
const uuid = require('uuid');
var pg = require('pg');
var DATABASE_URL = 'postgres://postgres:1234@localhost:5433/notes';
var client = new pg.Client(DATABASE_URL);
client.connect();
function response_format(code,result){
  const response       = {};
  response.status_code = code;
  response.body        = JSON.stringify(result);
  return response;
}
module.exports.create = async (event) => {
  const data     = JSON.parse(event.body);
  if(data)
  try {
    const result = await client.query("INSERT INTO public.cat(name) values('"+data.name+"') RETURNING *");
    return response_format('200',result.rows[0]);
  } catch(e) {
    return response_format(e.code,e.name);
  }
};
module.exports.getAll = async (event) => {
  try {
    const result = await client.query("SELECT * FROM public.cat");
    return response_format('200',result.rows);
  } catch(e) {
    return response_format(e.code,e.name);
  }
};
module.exports.getOne = async (event) => {
  const id =event.pathParameters.id;
  if(id)
    try { 
      const result = await client.query("SELECT * FROM public.cat WHERE id="+id+"")
      return response_format('200',result.rows);
    } catch(e) {
      return response_format(e.code,e.name);
    }
};
module.exports.update = async (event) => {
  const id   = event.pathParameters.id;
  const data = JSON.parse(event.body);
  if(id && data)
  try { 
    const result = await client.query("UPDATE public.cat SET name = '"+data.name+"' WHERE id="+id+" RETURNING *")
    return response_format('200',result.rows);
  } catch(e) {
    return response_format(e.code,e.name);
  }
};
module.exports.delete = async (event) => {
  const id =event.pathParameters.id;
  if(id)
  try { 
    const result = await client.query("DELETE FROM public.cat WHERE id="+id+" RETURNING *")
    return response_format('200',result.rows);
  } catch(e) {
    return response_format(e.code,e.name);
  }
};
