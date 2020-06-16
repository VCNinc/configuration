/**
 * @file Modular Network Configuration Manager (config package)
 * @copyright Modular 2020
 * @license MIT
 *
 * @description
 * Modular network configuration handler/wrapper to store, manage, and validate modular network configurations.
 *
 * @author Modulo (https://github.com/modulo) <modzero@protonmail.com>
 */

var { ModularTrustRoot } = require('@modular/smcc-core')

/**
 * Class representing a Modular Network Configuration.
 *
 * @author Modulo (https://github.com/modulo) <modzero@protonmail.com>
 * @since 1.0.0
 */
class ModularConfiguration {
  /**
   * Create a new {@link ModularConfiguration}.
   *
   * @example
   * let config = new ModularConfiguration({...});
   *
   * @param {Object} options - Object representing the configuration options.
   * @param {string[]} options.dohEndpoints - A list of DNS over HTTPS endpoints to be used for bootstrapping.
   * @param {string[]} options.dnsSeeds - A list of DNS seeds to be used for bootstrapping.
   * @param {string[]} options.httpsSeeds - A list of HTTPS seeds to be used for bootstrapping.
   * @param {number} options.networkModulus - The network modulus of the modular network.
   * @param {number} options.sectorMapSize - The sector map size of the primary sector map.
   * @param {number} options.logoSectorMapSize - The sector map size of the logo sector map.
   * @param {number} options.iconSectorMapSize - The sector map size of the icon sector map.
   * @param {string} options.root.fingerprint - The fingerprint of the modular network trust root.
   * @param {string} options.root.publicKeyArmored - The ASCII-armored modular network trust root public key.
   * @param {string} options.networkIdentifier - The name of the modular network this configuration is for.
   * @param {number} options.version - The version of the standard that this configuration is for.
   * @param {number} options.minSectorCoverage - The minimal coverage that each node must achieve on every sector.
   * @param {number} options.minHomeModCoverage - The minimal coverage that each node must achieve on its home mod.
   * @author Modulo (https://github.com/modulo) <modzero@protonmail.com>
   * @since 1.0.0
   * @async
   */
  static async new (options) {
    const config = new ModularConfiguration()

    if (arguments.length !== 1) throw new RangeError('ModularConfiguration.new expects exactly one argument')
    if (typeof options !== 'object' || options === null) throw new TypeError('Options must be an object')

    config.dohEndpoints = []
    options.dohEndpoints.forEach((endpoint) => {
      const urlRegex = /^(https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/g
      if (!urlRegex.test(endpoint)) throw new TypeError('Invalid DNS over HTTPS (DoH) endpoint: ' + endpoint)
      config.dohEndpoints.push(endpoint)
    })

    config.dnsSeeds = []
    options.dnsSeeds.forEach((seed) => {
      const hostRegex = /^([a-z0-9]+[.-])+([a-z0-9]+\.)+$/g
      if (!hostRegex.test(seed)) throw new TypeError('Invalid DNS seed: ' + seed)
      config.dnsSeeds.push(seed)
    })

    config.httpsSeeds = []
    options.httpsSeeds.forEach((seed) => {
      const urlRegex = /^(https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/g
      if (!urlRegex.test(seed)) throw new TypeError('Invalid HTTPS seed: ' + seed)
      config.httpsSeeds.push(seed)
    })

    if (!Number.isInteger(options.networkModulus)) throw new TypeError('Network modulus must be an integer')
    if (options.networkModulus <= 0) throw new RangeError('Network modulus must be positive')
    if (Math.log2(options.networkModulus) % 1 !== 0) throw new TypeError('Network modulus must be a power of 2')
    config.networkModulus = options.networkModulus

    if (!Number.isInteger(options.sectorMapSize)) throw new TypeError('Sector map size must be an integer')
    if (options.sectorMapSize <= 0) throw new RangeError('Sector map size must be positive')
    if ((Math.log(options.sectorMapSize) / Math.log(4)) % 1 !== 0) throw new RangeError('Sector map size must be a power of 4')
    config.sectorMapSize = options.sectorMapSize

    if (!Number.isInteger(options.logoSectorMapSize)) throw new TypeError('Logo sector map size must be an integer')
    if (options.logoSectorMapSize <= 0) throw new RangeError('Logo sector map size must be positive')
    if ((Math.log(options.logoSectorMapSize) / Math.log(4)) % 1 !== 0) throw new RangeError('Logo sector map size must be a power of 4')
    config.logoSectorMapSize = options.logoSectorMapSize

    if (!Number.isInteger(options.iconSectorMapSize)) throw new TypeError('Icon sector map size must be an integer')
    if (options.iconSectorMapSize <= 0) throw new RangeError('Icon sector map size must be positive')
    if ((Math.log(options.iconSectorMapSize) / Math.log(4)) % 1 !== 0) throw new RangeError('Icon sector map size must be a power of 4')
    config.iconSectorMapSize = options.iconSectorMapSize

    config.root = await ModularTrustRoot.new(options.root.fingerprint, options.root.publicKeyArmored)

    if (!Number.isInteger(options.version)) throw new TypeError('Version must be an integer')
    if (options.version <= 0) throw new RangeError('Version must be positive')
    config.version = options.version

    if (typeof options.networkIdentifier !== 'string') throw new TypeError('Network identifier must be a string')
    if (options.networkIdentifier.length === 0) throw new RangeError('Network identifier cannot be empty')
    config.networkIdentifier = options.networkIdentifier

    if (!Number.isInteger(options.minSectorCoverage)) throw new TypeError('Minimum sector coverage must be an integer')
    if (options.minSectorCoverage < 0) throw new RangeError('Minimum sector coverage cannot be negative')
    config.minSectorCoverage = options.minSectorCoverage

    if (!Number.isInteger(options.minHomeModCoverage)) throw new TypeError('Minimum home mod coverage must be an integer')
    if (options.minHomeModCoverage < 0) throw new RangeError('Minimum home mod coverage cannot be negative')
    config.minHomeModCoverage = options.minHomeModCoverage

    return config
  }
}

/* Module Exports */
module.exports.ModularConfiguration = ModularConfiguration
