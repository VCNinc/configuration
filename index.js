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
   * @param {string[]} options.dohEndpoints -
   * @param {string[]} options.dnsSeeds -
   * @param {string[]} options.httpsSeeds -
   * @param {number} options.networkModulus -
   * @param {number} options.sectorMapSize -
   * @param {number} options.logoSectorMapSize -
   * @param {number} options.iconSectorMapSize -
   * @author Modulo (https://github.com/modulo) <modzero@protonmail.com>
   * @since 1.0.0
   */
  constructor (options) {
    if (arguments.length !== 1) throw new RangeError('ModularConfiguration constructor expects exactly one argument')
    if (typeof options !== 'object' || options === null) throw new TypeError('Options must be an object')

    this.dohEndpoints = []
    options.dohEndpoints.forEach((endpoint) => {
      const urlRegex = /^(https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/g
      if (!urlRegex.test(endpoint)) throw new TypeError('Invalid DNS over HTTPS (DoH) endpoint: ' + endpoint)
      this.dohEndpoints.push(endpoint)
    })

    this.dnsSeeds = []
    options.dnsSeeds.forEach((seed) => {
      const hostRegex = /^([a-z0-9]+\.|-)+([a-z0-9]+\.)+$/g
      if (!hostRegex.test(seed)) throw new TypeError('Invalid DNS seed: ' + seed)
      this.dnsSeeds.push(seed)
    })

    this.httpsSeeds = []
    options.httpsSeeds.forEach((seed) => {
      const urlRegex = /^(https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/g
      if (!urlRegex.test(seed)) throw new TypeError('Invalid HTTPS seed: ' + seed)
      this.httpsSeeds.push(seed)
    })

    if (!Number.isInteger(options.networkModulus)) throw new TypeError('Network modulus must be an integer')
    if (options.networkModulus <= 0) throw new RangeError('Network modulus must be positive')
    if (Math.log2(options.networkModulus) % 1 !== 0) throw new TypeError('Network modulus must be a power of 2')
    this.networkModulus = options.networkModulus

    if (!Number.isInteger(options.sectorMapSize)) throw new TypeError('Sector map size must be an integer')
    if (options.sectorMapSize <= 0) throw new RangeError('Sector map size must be positive')
    if ((Math.log(options.sectorMapSize) / Math.log(4)) % 1 !== 0) throw new RangeError('Sector map size must be a power of 4')
    this.sectorMapSize = options.sectorMapSize

    if (!Number.isInteger(options.logoSectorMapSize)) throw new TypeError('Logo sector map size must be an integer')
    if (options.logoSectorMapSize <= 0) throw new RangeError('Logo sector map size must be positive')
    if ((Math.log(options.logoSectorMapSize) / Math.log(4)) % 1 !== 0) throw new RangeError('Logo sector map size must be a power of 4')
    this.logoSectorMapSize = options.logoSectorMapSize

    if (!Number.isInteger(options.iconSectorMapSize)) throw new TypeError('Icon sector map size must be an integer')
    if (options.iconSectorMapSize <= 0) throw new RangeError('Icon sector map size must be positive')
    if ((Math.log(options.iconSectorMapSize) / Math.log(4)) % 1 !== 0) throw new RangeError('Icon sector map size must be a power of 4')
    this.iconSectorMapSize = options.iconSectorMapSize
  }
}

/* Module Exports */
module.exports.ModularConfiguration = ModularConfiguration
