<#--

    Copyright (c) 2008-2021, Massachusetts Institute of Technology (MIT)
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its contributors
    may be used to endorse or promote products derived from this software without
    specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

-->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
 
<html>
<head>
    <title>Welcome to ${productName}</title>

    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <link rel="shortcut icon" href="welcome-content/favicon.ico" type="image/x-icon">

    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
</head>

<body>
<div class="container-fluid">
  <div class="row">
    <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
      <div class="welcome-header">
        <img src="${resourcesPath}/logo.png" alt="${productName}" border="0" />
        <h1>Welcome to <strong>${productName}</strong></h1>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-4">
          <div class="card-pf h-l">
            <img src="${resourcesPath}/nics-logo.jpg" height="290px" width="423px"/>
            <#if successMessage?has_content>
                <p class="alert success">${successMessage}</p>
            <#elseif errorMessage?has_content>
                <p class="alert error">${errorMessage}</p>
                <h3><img src="welcome-content/user.png">Administration Console</h3>
            <#elseif bootstrap>
                <#if localUser>
                    <h3><img src="welcome-content/user.png">Administration Console</h3>
                    <p>Please create an initial admin user to get started.</p>
                <#else>
                    <p class="welcome-message">
                        <img src="welcome-content/alert.png">You need local access to create the initial admin user. <br><br>Open <a href="http://localhost:8080/auth">http://localhost:8080/auth</a>
                        <br>or use the add-user-keycloak script.
                    </p>
                </#if>
            </#if>

            <#if bootstrap && localUser>
                <form method="post" class="welcome-form">
                    <p>
                        <label for="username">Username</label>
                        <input id="username" name="username" />
                    </p>

                    <p>
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </p>

                    <p>
                        <label for="passwordConfirmation">Password confirmation</label>
                        <input id="passwordConfirmation" name="passwordConfirmation" type="password" />
                    </p>

                    <input id="stateChecker" name="stateChecker" type="hidden" value="${stateChecker}" />

                    <button id="create-button" type="submit" class="btn btn-primary">Create</button>
                </form>
            </#if>
            <div class="welcome-primary-link">
              <h3><a href="admin/"><img src="welcome-content/user.png">Administration Console <i class="fa fa-angle-right link" aria-hidden="true"></i></a></h3>
              <div class="description">
                Centrally manage all aspects of the KeyCloak server
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4">
          <div class="card-pf h-l">
            <h3><a href="${properties.documentationUrl}"><img class="doc-img" src="welcome-content/admin-console.png">Documentation <i class="fa fa-angle-right link" aria-hidden="true"></i></a></h3>
            <div class="description">

              User Guide, Admin REST API and Javadocs

            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-4">
        <#if properties.displayCommunityLinks = "true">
          <div class="card-pf h-m">
            <h3><a href="http://www.keycloak.org"><img src="welcome-content/keycloak-project.png">Keycloak Project <i class="fa fa-angle-right link" aria-hidden="true"></i></a></h3>
          </div>
          <div class="card-pf h-m">
            <h3><a href="https://lists.jboss.org/mailman/listinfo/keycloak-user"><img src="welcome-content/mail.png">Mailing List <i class="fa fa-angle-right link" aria-hidden="true"></i></a></h3>
          </div>
          <div class="card-pf h-m">
            <h3><a href="https://issues.jboss.org/browse/KEYCLOAK"><img src="welcome-content/bug.png">Report an issue <i class="fa fa-angle-right link" aria-hidden="true"></i></a></h3>
          </div>
        </#if>
        </div>
      </div>
      <div class='footer'>
        <#if properties.displayCommunityLinks = "true">
        <a href="http://www.jboss.org"><img src="welcome-content/jboss_community.png" alt="JBoss and JBoss Community"></a>
        </#if>
      </div>
    </div>
  </div>
</div>
</body>
</html>
