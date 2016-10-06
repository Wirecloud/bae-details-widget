BAE Details Widget
======================

The BAE details widget is a WireCloud widget that provides the ability to displaye the details of an offering, such as the products, its pricing and the Wirecloud components it provides.

Build
-----

Be sure to have installed [Node.js](http://node.js) and [Bower](http://bower.io) in your system. For example, you can install it on Ubuntu and Debian running the following commands:

```bash
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g bower
```

If you want the last version of the widget, you should change to the `develop` branch:

```bash
git checkout develop
```

Install other npm dependencies by running: (need root because some libraries use applications, check package.json before to be sure)

```bash
sudo npm install
```

For build the widget you need download grunt:

```bash
sudo npm install -g grunt-cli
```

And now, you can use grunt:

```bash
grunt
```

If everything goes well, you will find a wgt file in the `dist` folder.

## Settings

No settings needed for this widget to work.

## Wiring

### Input Endpoints

-`Offering`: The offering whose details are to be displayed.

## Usage

This Widget its created dynamically by the [bae-browser-widget](https://github.com/Wirecloud/bae-browser-widget) so it doesnt need to be added to the dashboard when being used by it.

Send an offering with a complete productSpecification field to its input to display the offering's details.

## Copyright and License

Copyright (c) 2016 CoNWeT
Licensed under the MIT license.
