import express from "express";
import bodyParser from "body-parser";

let posts = [];

const port = 3000;
const app = express();

app.use( express.static( "public" ) );

app.use( bodyParser.urlencoded( { extends: true } ) );

app.get( "/", ( req, res ) => {
  res.render( "index.ejs" );
} );

app.get( "/all-posts", ( req, res ) => {
  res.render( "all-posts.ejs", { posts: posts } );
} );

app.get( "/view-post", ( req, res ) => {
  const index = req.query.index;

  res.render( "view-post.ejs", { posts: posts, index: index });
} );

app.get( "/edit", ( req, res ) => {
  const index = req.query.index;

  res.render( "edit.ejs", { posts: posts, index: index } );
} );

app.get( "/delete", ( req, res ) => {
  const index = req.query.index;

  res.render( "delete.ejs", { index: index });
} ); 

app.post( "/post-creation", ( req, res ) => {
  const body = req.body;
  const title = body.title;
  const content = body.content;

  posts.push( { title: title, content: content } );

  res.redirect( "/all-posts" );
} );

app.post( "/save-edit", ( req, res ) => {
  const body = req.body;
  const title = body.title;
  const content = body.content;
  const index = req.query.index;

  posts[ index ] = { title: title, content: content };

  res.redirect( `/view-post?index=${ index }` );
} );

app.post( "/delete", ( req, res ) => {
  const index = req.query.index;

  posts.splice(index, 1);

  res.redirect( "/all-posts" );
} );

app.listen( port, () => {
  console.log( `Servidor rodando na porta ${ port }` );
} );