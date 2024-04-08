# How to use

**In PowerShell:**

Set the environment variables:

> $env:place = "On the moon"<br />
> $env:key = "0123456789"<br />
> echo "place: $env:place, key: $env:key"

Run the test:

> node use-secrets.js env-secrets.txt secrets.txt place key

Now check the content of the 'demo-secrets-delete-me.txt' file:

> cat .\secrets.txt

# Purpose

This script may be used on a pipeline
to add secrets into a file.

In a pipeline you may get secrets from
environment variables - then you can use
this script to create the file with the secrets.

This is a sample instruction for how to add a secret to
the '.npmrc' file:

```
- script: |
    # assume that the secret in the key vault was named 'npmPassword' and is now linked as $(npmPassword)
    echo "registry=http://your-registry.com/" > .npmrc
    echo "//your-registry.com/:_authToken=$(npmPassword)" >> .npmrc
  displayName: 'Generate .npmrc file with secret'
```

But the '.npmrc' file is _not_ just a line or two, so using 'echo' is
not a good solution.

With the 'use-secrets' script you can create a
'env.npmrc' file with all the variable names to be substituted - like this:

```
registry=https://pkgs.dev.azure.com/$FeedCompany/$FeedId/_packaging/$FeedName/npm/registry/

always-auth=true

; begin auth token
//pkgs.dev.azure.com/$FeedCompany/$FeedId/_packaging/$FeedName/npm/registry/:username=$FeedCompany
//pkgs.dev.azure.com/$FeedCompany/$FeedId/_packaging/$FeedName/npm/registry/:_password=$FeedPassword
//pkgs.dev.azure.com/$FeedCompany/$FeedId/_packaging/$FeedName/npm/registry/:email=$FeedEmail
//pkgs.dev.azure.com/$FeedCompany/$FeedId/_packaging/$FeedName/npm/:username=$FeedCompany
//pkgs.dev.azure.com/$FeedCompany/$FeedId/_packaging/$FeedName/npm/:_password=$FeedPassword
//pkgs.dev.azure.com/$FeedCompany/$FeedId/_packaging/$FeedName/npm/:email=$FeedEmail
; end auth token
```

Now - you can make sure the environment variables are defined, and run:

> node use-secrets.js env.npmrc .npmrc FeedCompany FeedId FeedName FeedEmail FeedPassword

Push 'env.npmrc' to github and add '.npmrc' to the '.gitigmore'.

## Developed by

Note that this wcript was created by ChatGPT
