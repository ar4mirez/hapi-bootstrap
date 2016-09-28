# hapi-boostrap

### Quick start

```bash
git clone git@github.com:cuemby/hapi-bootstrap.git
cd hapi-boostrap

# make sure you have shrinkpack installed.
npm install -g shrinkpack

# Update your local shrinkwrap.json
npm run pack

# Install development dependencies
npm install

```

#### If you are gonna add a new package make sure you run the following command after.

```bash
# Example installing lab and code
npm install --save-dev lab code

# Update shrinkwrap
npm run pack
```
