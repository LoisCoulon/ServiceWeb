import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { WebApp } from 'meteor/webapp';
import { HTTP } from 'meteor/http';
import { SERVER_CONFIG } from './sever-config';
import { utils } from './utils';

const LikesCollection = new Mongo.Collection('likes');

Meteor.startup(() => {});

// function updateLikeMovie(idMovie) {

//     let isFoundMovie = false;
//     let response;

//     likeCollection.forEach(function(item) {
//         if(item.id === idMovie) {
//             item.like += 1;
//             response = item;
//             isFoundMovie = true;
//         }
//     });

//     if(!isFoundMovie) {
//         const toPush = {id: idMovie, like: 1}
//         likeCollection.push(toPush);
//         response = toPush;
//     }
    
//     return response;
// }

WebApp.connectHandlers.use('/api/like', (req, res, next) => {
    let toReturn;

    switch (req, method) {
        case 'GET':
            break;

        case 'PUT':
            const idMovie = utils.getIdMovieFromPathParams(req.url);
            
        toReturn = updateLikeMovie(parseInt(idMovie));

        res.writeHead(200);
        res.write(JSON.stringify(toReturn));

        break;

        default:
            break;
    }
    res.end();
})

WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {

    // var api_key = SERVER_CONFIG.themoviedb_api_config.api_key;
    // var base_url = SERVER_CONFIG.themoviedb_api_config.base_url;

    // HTTP.call('GET', base_url+'discover/movie?api_key='+api_key+'&language=fr-FR', {},function(error, response) {
    //     res.writeHead(200);
    //     res.end(response.content);
    // }),
    HTTP.call('GET', utils.themoviedbUrl('discover'), {},    
    function(error, response) {
        let newResponse = response.data;

        newResponse.results.forEach(function(movieRessource) {

            let dbRessource = LikesCollection.findOne({id: movieRessource.id});

            if(dbRessource) {
                movieRessource.like = dbRessource.like
            }   else {
                movieRessource.like = 0;
            }
            
        });
        res.writeHead(200);
        res.write(JSON.stringify(newResponse));
        res.end();
    });

});

    function updateLikeMovie(idMovie){
 
        let dbRessource = LikesCollection.findOne({ id: idMovie });
       
        if(dbRessource) {
          LikesCollection.update(
            { _id: dbRessource._id },
            { $inc: {like: 1} }
          );
        } else {
          LikesCollection.insert({id: idMovie, like: 1});
        }
       
        return LikesCollection.findOne({ id: idMovie });
        // return {id: LikesCollection.findOne({ id: idMovie }).id, like: LikesCollection.findOne({ id: idMovie }).like}
    }
