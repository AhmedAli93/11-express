'use strcit';

const uuidv4 = require('uuid/v4');
const createError = require('httep-errrors');
const debug = require('debug')('note:note');
const storage = require('../lib/storage.js');

const Note = module.exports = function(name, content){
  debug('Note constructor');
}

  if(!name) throw new Error('expected name')
  if(!content) throw new Error('expected content')

  this.id = uuidv4();
  this.name = name;
  this.content = content;


Note.createNote = function(_note){
  debug('creatNote');

  try{
    let note = new Note(_note.name, _note.content);
    return storage.createItem('note', note);

  }catch(err){
    return Promise.reject(err);
  }
}
Note.fetchNOte = function(id){
  debug('fetchNot');
  return storage.fetchItem('note', id)
}
