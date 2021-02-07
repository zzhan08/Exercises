var ldap = require('ldapjs');
var assert = require('assert');
var shortid = require('shortid');
var async = require("async");
var _ = require("underscore");
// var crypto = require('crypto')
//   , shasum = crypto.createHash('sha1');
// shasum.update("1234");
// console.log(shasum.digest('hex'));
var client = ldap.createClient({
  url: 'ldap://192.168.1.243:389'
});
client.bind('cn=admin,dc=innopharmalabs,dc=com', 'admin', function(err,res) {
  console.log("err",err);

  // console.log("result",res.connection);
  // let filter = { filter: '(objectclass=*)', scope: 'sub' };
  // client.search('dc=innopharmalabs,dc=com', filter, function(err, result){
  //   console.log("errerr",err);
  //   let errorMsg = "";
  //   result.on('searchEntry', function(entry) {
  //     console.log("entry",entry);
  //         console.log("entry object",entry.object);

  //   });
  //   result.on('error', function (err) {
  //     console.log("err",err);
  //   });
  //   result.on('end', function(result) { 
  //     console.log("result: ", result);
  //   });
  // });
  // assert.ifError(err);
  // if(!err){
  //   console.log("Login successfully");
  // }
  // client.modifyDN('cn=addNewOne,ou=policies,dc=innopharmalabs,dc=com', 'cn=addNewOne,ou=Technology,dc=innopharmalabs,dc=com', function(errx) {
  //   assert.ifError(errx);
  //   if(!errx){
  //     console.log("modify successfully");
  //   }
  // });
//   var entry = {
//     operation : 'replace', modification: { 
//       mail : "abc",
//       mobile: "0000"
//     }
//   };
//    var change = new ldap.Change(entry);
//   client.modify('cn=testU1,ou=Technology,dc=innopharmalabs,dc=com', change, function(err) {
//     console.log("add user err",err);
    
//     if(!err){
//       cb()
//     }else{
//       cb(err);
//     }
//   });
client.search('dc=innopharmalabs,dc=com',{ filter: '(unauthNotification=FALSE)', scope: 'sub' },function(err,res){
  console.log("err",err);
  res.on('searchEntry', function(entry) {
    console.log("entry1",entry.object);
  });
  res.on('searchReference', function(referral) {
    console.log('referral: ' + referral.uris.join());
  });
  res.on('error', function(err) {
    console.error('error: ' + err.message);
  });
  res.on('end', function(result) {
    console.log('status: ' + result.status);
  });
});
});
// client.search('dc=innopharmalabs,dc=com',{ filter: '(pwdAccountLockedTime=*)', scope: 'sub' },function(err,res){
//   console.log("err",err);
//   console.log("result",res);
//   res.on('searchEntry', function(entry) {
//     console.log('entry: ' + JSON.stringify(entry.object));
//   });
//   res.on('searchReference', function(referral) {
//     console.log('referral: ' + referral.uris.join());
//   });
//   res.on('error', function(err) {
//     console.error('error: ' + err.message);
//   });
//   res.on('end', function(result) {
//     console.log('status: ' + result.status);
//   });
// });
// var entry = {
//   operation : 'replace', modification: { 
//     pwdAccountLockedTime : [] 
//   }
// };
// var entry = {
//   operation : 'add', modification: { pwdAccountLockedTime : "20190604135300Z" }
// };
// var change = new ldap.Change(entry);
// client.modify('cn=admin,ou=Technology,dc=innopharmalabs,dc=com', change, function(err) {
//       console.log("modify user err",err);
      
//       if(!err){
//         cb()
//       }else{
//         cb(err);
//       }
//     });
// var entry = {
//   cn: 'zhangz9',
//   employeeNumber: shortid.generate(),
//   givenName:"jason",
//   initials:"Mr",
//   mail:"afds@dasf.com",
//   mobile:"0870977987",
//   // uid: 'zhangz5',
//   sn:'zhnagz',
//   objectclass: 'inetOrgPerson',
//   userPassword: "12345"
// };
// async.each(Object.keys(entry),function(key,cb){
//     let paras = {operation: 'replace',
//       modification:{}
//     };
//     paras.modification[key] = _.flatten([entry[key]]);
//     console.log("paras",paras);
//     var change = new ldap.Change(paras);
//     client.modify('cn=testU1,ou=Technology,dc=innopharmalabs,dc=com', change, function(err) {
//       console.log("add user err",err);
      
//       if(!err){
//         cb()
//       }else{
//         cb(err);
//       }
//     });
//   },function(err,result){
//     console.log("sdfdsf");
//   });





// client.compare('cn=root, o=joyent', 'sn', 'bar', function(err, matched) {
//   assert.ifError(err);
//   console.log('matched: ' + matched);
// });