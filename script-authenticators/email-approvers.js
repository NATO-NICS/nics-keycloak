/*
 * Copyright (c) 2008-2021, Massachusetts Institute of Technology (MIT)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/* 
 * Email approvers of user accounts
 *  Uses existing realm smtp configuration to send email
 *  Sends an email to list of approvers with a user's registration details
 *  Email will contain a link to user's account page on Admin console
 *
 */
 
// list email addresses of approvers
// use comma's to seperate email addresses
var approvers = "<email_address>,<email_address>";
var subjectText = "New User Registration - Action Required to Enable";

/**
 * The following variables are available for convenience:
 * user - current user {@see org.keycloak.models.UserModel}
 * realm - current realm {@see org.keycloak.models.RealmModel}
 * session - current KeycloakSession {@see org.keycloak.models.KeycloakSession}
 * httpRequest - current HttpRequest {@see org.jboss.resteasy.spi.HttpRequest}
 * script - current script {@see org.keycloak.models.ScriptModel}
 * authenticationSession - current authentication session {@see org.keycloak.sessions.AuthenticationSessionModel}
 * LOG - current logger {@see org.jboss.logging.Logger}
 *
 * You one can extract current http request headers via:
 * httpRequest.getHttpHeaders().getHeaderString("Forwarded")
 *
 * @param context {@see org.keycloak.authentication.AuthenticationFlowContext}
 */
function authenticate(context) {
 
  // retrieve realm smtp configuration, returns Map
  var smtpConfig = realm.getSmtpConfig();
  
  // create new Prop for smtp mail session
  var props = new java.util.Properties();

  var auth = smtpConfig.get("auth");
  var ssl = smtpConfig.get("ssl");
  var starttls = smtpConfig.get("starttls");

  LOG.info(script.name + " Finding SMTP host");
  if (smtpConfig.get("host") !== null) {
      props.put("mail.smtp.host", smtpConfig.get("host"));
      LOG.info(script.name + " Found SMTP host: " + smtpConfig.get("host"));
  }
  
  LOG.info(script.name + " Finding SMTP port");
  if (smtpConfig.get("port") !== null) {
     props.put("mail.smtp.port", smtpConfig.get("port"));
     LOG.info(script.name + " Found SMTP port: " + smtpConfig.get("port"));
  }
  
  LOG.info(script.name + " Finding SMTP auth");
  if (smtpConfig.get("auth") == "true") {
      props.put("mail.smtp.auth", "true");
      LOG.info(script.name + " Found SMTP auth: " + smtpConfig.get("auth"));
  }

  LOG.info(script.name + " Finding SMTP ssl");  
  if (smtpConfig.get("ssl") == "true") {
      props.put("mail.smtp.ssl.enable", "true");
      props.put("mail.smtp.ssl.trust", "*");
      LOG.info(script.name + " Found SMTP ssl: " + smtpConfig.get("ssl"));

  }
  
  LOG.info(script.name + " Finding SMTP starttls");  
  if (smtpConfig.get("starttls") == "true") {
      props.put("mail.smtp.starttls.enable", "true");
      props.put("mail.smtp.ssl.trust", "*");
      LOG.info(script.name + " Found SMTP starttls: " + smtpConfig.get("starttls"));
  }
  
   // set connection timeout to 5 seconds, otherwise infinite delay
  props.put("mail.smtp.timeout", "5000");
  props.put("mail.smtp.connectiontimeout", "5000");
  
  // start SMTP mail session 
  var SMTPMessage = Java.type("com.sun.mail.smtp.SMTPMessage");
  var Session = Java.type("javax.mail.Session");
  var mailSession = Session.getInstance(props, null);
  var MimeMessage = Java.type("javax.mail.internet.MimeMessage");
  var msg = new SMTPMessage(mailSession);
  var InternetAddress = Java.type("javax.mail.internet.InternetAddress");
  
  // use existing smtp configuration of realm
  msg.setFrom( new InternetAddress(smtpConfig.get("from"),smtpConfig.get("fromDisplayName")));
  var Message = Java.type("javax.mail.Message");
  msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(approvers));
  msg.setSentDate(new java.util.Date());
  msg.setSubject(subjectText);
  
  // contruct email message in txt format
  var msgText = 
     "First Name: " + user.getFirstName() + "\n" + 
     "Last Name: " + user.getLastName() + "\n" + 
     "Email Address: " + user.getEmail() + "\n" + 
     "Link to User Account Page:\n" +
      httpRequest.getUri().getBaseUri() + "admin/master/console/#/realms/"+ realm.getName() + "/users/" + user.getId();
  msg.setText(msgText);
  LOG.info(script.name + " Set Message Text" + "\n" + msgText );
  
  // send email
  var Transport = mailSession.getTransport("smtp");
  
  if (smtpConfig.get("auth") == "true") {
      Transport.connect(smtpConfig.get("user"),smtpConfig.get("password"));
  } else {
      Transport.connect();
  }
  
  Transport.sendMessage(msg,msg.getAllRecipients());   
  
  
  // exit clean
  context.success();
}