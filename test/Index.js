var {ModularConfiguration} = require('../index.js');
var should = require('chai').should();

suite('ModularConfiguration', () => {
	test('Valid Configuration', () => {
		let config = new ModularConfiguration({
			dohEndpoints: [
				"https://cloudflare-dns.com/dns-query",
				"https://dns.google/resolve",
				"https://doh.securedns.eu/dns-query",
				"https://doh-jp.blahdns.com/dns-query",
				"https://dns.dns-over-https.com/dns-query",
				"https://dns.rubyfish.cn/dns-query",
				"https://dns.containerpi.com/dns-query",
				"https://doh-de.blahdns.com/dns-query",
				"https://doh.dns.sb/dns-query",
				"https://doh.li/dns-query"
			],
			dnsSeeds: [
				"seed.modular.social.",
				"modularseed.xyz."
			],
			httpsSeeds: [
				"https://modularseed.xyz/seed",
				"https://raw.githubusercontent.com/modular/seed/master/seed"
			],
			networkModulus: 65536,
			sectorMapSize: 64,
			logoSectorMapSize: 16,
			iconSectorMapSize: 4
		});
	});
});
