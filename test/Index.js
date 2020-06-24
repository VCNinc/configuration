var { ModularConfiguration } = require('../index.js')
var should = require('chai').should()

test('Full', () => {
  return new Promise((resolve, reject) => {
    ModularConfiguration.new({
      networkIdentifier: 'test',
      version: 1,
      maxConcurrentRequests: 5,
      defaultNodePriority: 0,
      pingPriorityThreshold: 1000,
      defaultRequestPriority: 200,
      discoveryRequestPriority: 100,
      bootstrapRequestPriority: 300,
      recoveryDelay: 1000,
      dnsServers: [
        '208.67.222.222',
        '208.67.220.220'
      ],
      dohEndpoints: [
        'https://cloudflare-dns.com/dns-query?type=URI&edns_client_subnet=0.0.0.0/0&do=0',
        'https://dns.google/resolve?type=256&edns_client_subnet=0.0.0.0/0&do=0'
      ],
      staticSeeds: [
        'https://rendezvous.modularseed.xyz'
      ],
      minSectorCoverage: 1,
      minHomeModCoverage: 1,
      dnsSeeds: [
        'seed.modular.social',
        'modularseed.xyz'
      ],
      httpsSeeds: [
        'https://modularseed.xyz/seed',
        'https://raw.githubusercontent.com/modular/seed/master/seed'
      ],
      networkModulus: 65536,
      sectorMapSize: 64,
      logoSectorMapSize: 16,
      iconSectorMapSize: 4,
      root: {
        fingerprint: '24CAC700CA118104DA6B35C4AF0199E5B99DFB69',
        publicKeyArmored:
`-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v1

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
=h/f0
-----END PGP PUBLIC KEY BLOCK-----`
      }
    }).then((config) => {
			let duplicate = ModularConfiguration.new(config)
      resolve()
    })
  })
})
