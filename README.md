# BAE Details Widget

[![](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/visualization.svg)](https://www.fiware.org/developers/catalogue/)
![](https://img.shields.io/github/license/Wirecloud/bae-details-widget.svg)

The BAE details widget is a [WireCloud widget](http://wirecloud.readthedocs.org/en/latest/) that provides the ability to
displaye the details of an offering, such as the products, its pricing and the Wirecloud components it provides. Also,
it this widget allows to install or uninstall specifid Wirecloud components in an offering.

## Build

Be sure to have installed [Node.js](http://node.js) and [Bower](http://bower.io) in your system. For example, you can
install it on Ubuntu and Debian running the following commands:

```console
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g bower
```

Install other npm dependencies by running:

```console
npm install
```

In order to build this operator you need to download grunt:

```console
sudo npm install -g grunt-cli
```

And now, you can use grunt:

```console
grunt
```

If everything goes well, you will find a wgt file in the `dist` folder.

## Documentation

Documentation about how to use this widget is available on the [User Guide](src/doc/userguide.md). Anyway, you can find
general information about how to use widgets on the
[WireCloud's User Guide](https://wirecloud.readthedocs.io/en/stable/user_guide/) available on Read the Docs.

## Copyright and License

Copyright (c) 2016-2017 CoNWeT Lab., Universidad Politécnica de Madrid Licensed under the Apache-2.0 license.
