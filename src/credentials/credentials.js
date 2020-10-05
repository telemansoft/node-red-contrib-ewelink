const ewelink = require('ewelink-api');

/**
 * Credentials node.
 * This is a configuration node that holds the credentials for eWeLink.
 */
module.exports = function (RED) {
  /**
   * Credentials node constructor.
   * 
   * @param {object} config The configuration for the node.
   */
  function CredentialsNode(config) {
    // Create the node
    RED.nodes.createNode(this, config);

    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    // Unpack credentials
    if (re.test(this.credentials.username)) {
      this.email = this.credentials.username;
      this.phoneNumber = null;
    } else {
      this.phoneNumber = this.credentials.username;
      this.email = null;
    };    
    this.password = this.credentials.password;
    this.region = this.credentials.region;
    
    // Initialize eWeLink
    this.connection = new ewelink({
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      region: this.region,
    });
  }

  // Register node
  RED.nodes.registerType('ewelink-credentials', CredentialsNode, {
    credentials: {
      username: { type: 'text' },
      password: { type: 'password' },
      region: { type: 'text' }
    }
  });
}
