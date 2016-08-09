var aws = require("aws-sdk");
var ses = new aws.SES({"accessKeyId": "<your access keyi id>", "secretAccessKey": "your access key", "region": "us-west-2"});

/*
ses.verifyEmailAddress({EmailAddress: 'liberaldart@gmail.com'}, function(err, data) {
 if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

ses.verifyEmailAddress({EmailAddress: 'aksinghdce@gmail.com'}, function(err, data) {
 if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
*/

exports.sendEmail =  function (email_content) {
	ses.sendEmail(email_content, function (err, data) {
  		if (err) console.log(err);
  		else console.log(data);
	});

}

