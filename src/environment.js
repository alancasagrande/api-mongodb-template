import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

var environment = process.env.NODE_ENV || 'development';

var mongoPort = process.env.MONGO_PORT || 'tcp://localhost:27017';
var databaseName = '/api_template_' + environment;
var mongoUri = process.env.MONGO_URI || mongoPort.replace('tcp', 'mongodb') + databaseName;

mongoose.connect(mongoUri);

// https://github.com/andris9/nodemailer-smtp-transport#usage
var mailer = nodemailer.createTransport({});

var config = {
  resetPasswordUrl: process.env.RESET_PASSWORD_URL || 'https://api-mongodb-template'
};

export default {
  name: environment,
  config: config,
  mailer: mailer
};
