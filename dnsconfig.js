// Initialize Cloudflare provider
var REG_NONE = NewRegistrar('none');
var DSP_CLOUDFLARE = NewDnsProvider('cloudflare');

// Read all JSON files from the domains/ directory using a helper script
// (In production, you'll write a small node script to parse the files into an array)
var domains = require('./parse-domains.js')(); 

D('yourdomain.dev', REG_NONE, DnsProvider(DSP_CLOUDFLARE),
    A('@', '192.0.2.1'), // Your main landing page
    
    // Loop through user files and inject them dynamically
    domains.map(function(d) {
        if (d.records.CNAME) {
            return CNAME(d.subdomain, d.records.CNAME);
        }
        if (d.records.A) {
            return A(d.subdomain, d.records.A);
        }
    })
);
