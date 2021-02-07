var ldap = require('ldapjs');

var assert = require("assert");

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var Ber = require('asn1').Ber;
let async = require("async");
/** The OID of the modify password extended operation */
var LDAP_EXOP_X_MODIFY_PASSWD = '1.3.6.1.4.1.4203.1.11.1';
/** The BER tag for the modify password dn entry */
var LDAP_TAG_EXOP_X_MODIFY_PASSWD_ID = 0x80;

/** The BER tag for the modify password new password entry */
var LDAP_TAG_EXOP_X_MODIFY_PASSWD_OLD = 0x81;
/** The BER tag for the modify password new password entry */
var LDAP_TAG_EXOP_X_MODIFY_PASSWD_NEW = 0x82;
  var dn = 'cn=test,ou=technology,dc=innopharmalabs,dc=com';
  var op = '123'
  var np = 'qwert@'
  var writer = new Ber.Writer();

  writer.startSequence();
  writer.writeString(dn, LDAP_TAG_EXOP_X_MODIFY_PASSWD_ID);
  writer.writeString(op, LDAP_TAG_EXOP_X_MODIFY_PASSWD_OLD);
  writer.writeString(np, LDAP_TAG_EXOP_X_MODIFY_PASSWD_NEW);
  writer.endSequence();

  var client = ldap.createClient({
    url: 'ldap://192.168.1.243:389',
  });

  // client.bind(dn, op, function(err) {
    client.exop(LDAP_EXOP_X_MODIFY_PASSWD, writer.buffer, function(err, result) {
        if (err) {
            console.log(err); //StrongAuthRequiredError: only authenticated users may change passwords
        } else {
            console.log('Sucessfully modified password', result);
        }

    });
  // });