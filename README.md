# nics-keycloak
NICS Keycloak Theme, Translations and Script Authenticators

This repository contains 'nics' themes which is a child the 'keycloak' theme.

https://www.keycloak.org/docs/latest/server_development/index.html#_themes

## Compatibility
These themes have only been tested on Keycloak 4.5.Final.

## Installation
1. Copy the folder 'nics' from 'themes\nics' into <keycloak_home>/themes directory, chown to keycloak user/group, restart keycloak service.
2. In the Keycloak Admin Console, go to Realm Settings -> Themes Tab -> Change all 4 themes to 'nics'
3. In the Keycloak Admin Console, go to Realm Settings -> Themes Tab -> Update 'Supported Locales' to use the new locales, we use 'bs, en, hr, ro, es, mk, sr, sr_ME'.
4. In the Keycloak Admin Console go to Clients -> Select your Client -> Settings Tab -> Change 'Login Theme' to 'nics'

## Future Work
- Compile into jar file to deploy to Wildfly
- Add additional registration fields
- Ensure compatability with future Keycloak version
- More translations, including Email messages and others

## Translations used from NICS Bundles to Keycloak Themes
| Keycloak | NICS | Bundle |
|:----------:|:-----:|:------:|
| doClickHere | clickHere | LoginBundle |
| doSubmit | clickHere | LoginBundle |
| doForgotPassword | forgotPassword | LoginBundle |
| emailForgotTitle | forgotPassword | LoginBundle |
| errorTitle | loginError | LoginBundle |
| errorTitleHtml | loginError | LoginBundle |
| username | username | LoginBundle |
| firstName | firstName | RegisterBundle |
| lastName | lastName | RegisterBundle |
| password | password | RegisterBundle |
| confirmPassword | confirmPassword | RegisterBundle |
| doRegister | registration | RegisterBundle |
| registerTitle | registration | RegisterBundle |

