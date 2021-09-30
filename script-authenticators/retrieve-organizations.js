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
var emapiUrl = 'http://<fqdn-nics-data>:8080/em-api/v1';

var allOrgsUrl = emapiUrl + "/orgs/1/all";
var orgTypesUrl = emapiUrl + "/orgs/1/types";
var orgOrgTypeUrl = emapiUrl + "/orgs/1/typemap";

SimpleHttp = Java.type("org.keycloak.broker.provider.util.SimpleHttp");
// import enum for error lookup
AuthenticationFlowError = Java.type("org.keycloak.authentication.AuthenticationFlowError");

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

    client = session.getContext().getClient();

    var orgsJsonString = SimpleHttp.doGet(allOrgsUrl, session).asString();
    var orgsJsonParsed = JSON.parse(orgsJsonString);
    LOG.info(script.name + " allOrgsUrl: \n" + orgsJsonString);

    var orgtypesJsonString = SimpleHttp.doGet(orgTypesUrl, session).asString();
    var orgtypesJsonParsed = JSON.parse(orgtypesJsonString);
    LOG.info(script.name + " orgTypesUrl: \n" + orgtypesJsonString);

    var orgtypemapJsonString = SimpleHttp.doGet(orgOrgTypeUrl, session).asString();
    var orgtypemapJsonParsed = JSON.parse(orgtypemapJsonString);
    LOG.info(script.name + " orgOrgTypeUrl: \n" + orgtypemapJsonString);

    var affiliationsList = [];
    for (var i = 0; i < orgtypesJsonParsed.count; i++) {
      affiliationsList.push(orgtypesJsonParsed.orgTypes[i].orgTypeId + "|" + orgtypesJsonParsed.orgTypes[i].orgTypeName);
    }
    LOG.info(script.name + " affiliationsList (" + affiliationsList.toString().length + "): \n" + affiliationsList );
    client.setAttribute('affiliations',affiliationsList);

    var organizationsList = [];
    for (var j = 0; j < orgsJsonParsed.count; j++) {
      if (Object.keys(orgsJsonParsed.organizations[j].orgTypes).length !== 0) {
         organizationsList.push(orgsJsonParsed.organizations[j].orgTypes[0].orgtypeid + '|' + orgsJsonParsed.organizations[j].orgId + '|' + orgsJsonParsed.organizations[j].name);
      }
    }
    LOG.info(script.name + " organizationsList (" + organizationsList.toString().length + "): \n" + organizationsList); 
    client.setAttribute('organizations',organizationsList);
    
    
    
    //var orgtypeLists = [];
    //for (var k = 0; k < orgsJsonParsed.count; k++) {
    //    orgtypeLists.push(orgsJsonParsed.organizations[k].orgTypes.orgtypeid
    //}
    context.success();
}