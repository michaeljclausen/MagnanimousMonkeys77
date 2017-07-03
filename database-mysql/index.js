var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host     : process.env.DB_HOST || 'localhost',
//   user     : process.env.DB_USERNAME || 'root',
//   password : process.env.DB_PASSWORD || 'plantlife',
//   database : process.env.DB_NAME || 'thumbscheck'
// });

var pool  = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USERNAME || 'root',
  password : process.env.DB_PASSWORD || 'plantlife',
  database : process.env.DB_NAME || 'thumbscheck'
});


console.log(`db connection: DB_HOST ${process.env.DB_HOST}, DB_USERNAME ${process.env.DB_USERNAME}, DB_PASSWORD ${process.env.DB_PASSWORD}, DB_NAME ${process.env.DB_NAME}`);

exports.getUserType = function(gmail) {
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT user_type FROM users WHERE gmail = "${gmail}"`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.createNewLecture = function(name) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO lectures (name) VALUES ("${name}")`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.createNewQuestion = function(lectureId) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO questions (lecture_id) VALUES ("${lectureId}")`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

/* Section
*/

exports.addAvgThumbForQuestion = function(questionId, avgThumbValue) {
  return new Promise ((resolve, reject) => {
    pool.query(`UPDATE questions SET average_thumb_question=${avgThumbValue} WHERE id=${questionId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.addAvgThumbForLecture = function(lectureId, avgThumbValue) {
  return new Promise ((resolve, reject) => {
    pool.query(`UPDATE lectures SET average_thumb_lecture=${avgThumbValue} WHERE id=${lectureId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

// section

exports.createThumbData = function(userId, questionId, thumbsValue) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO thumbs (user_id, question_id, thumb_value) VALUES (${userId}, ${questionId}, ${thumbsValue})`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.getUserId = function(gmail) {
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT id FROM users WHERE gmail = "${gmail}"`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.addStudent = function(first, last, gmail) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("${first}", "${last}", "${gmail}", "STUDENT");`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

// test

/*
var prom1 = exports.getUserId('caaker.0@gmail.com');
prom1.then(results => {
  console.log(results[0].id);
});

var prom2 = exports.createThumbData(4, 1, 5);
prom2.then(results => {
  console.log(results);
});
*/
