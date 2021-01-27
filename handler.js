'use strict';
const uuid = require('uuid');
var pg = require('pg');
var DATABASE_URL = 'postgres://postgres:1234@localhost:5433/notes';
var client = new pg.Client(DATABASE_URL);
client.connect();

module.exports.create = async (event) => {
  const data =JSON.parse(event.body);
  client.query("INSERT INTO public.cat(name) values('"+data.name+"') RETURNING *", function (err, result) {
    if(err){
      console.error(err);
    }else{
      console.log('The result is: ', result.rows[0]);
    }
  });
};
module.exports.getAll = async (event) => {
  client.query("SELECT * FROM public.cat", (err, result) => {
    if(err){
      console.error(err);
    }else{
      console.log('The result is: ', result.rows);
    }
  });
};
module.exports.getOne = async (event) => {
  const id =event.pathParameters.id;
  client.query("SELECT * FROM public.cat WHERE id="+id+"", (err, result) => {
    if(err){
      console.error(err);
    }else{
      console.log('The result is: ', result.rows);
    }
  });
};
module.exports.update = async (event) => {
  const id   =event.pathParameters.id;
  const data =JSON.parse(event.body);
  client.query("UPDATE public.cat SET name = '"+data.name+"' WHERE id="+id+" RETURNING *", (err, result) => {
    if(err){
      console.error(err);
    }else{
      console.log('The result is: ', result.rows);
    }
  });
};
module.exports.delete = async (event) => {
  const id =event.pathParameters.id;
  client.query("DELETE FROM public.cat WHERE id="+id+" RETURNING *", (err, result) => {
    if(err){
      console.error(err);
    }else{
      console.log('The result is: ', result.rows);
    }
  });
};
