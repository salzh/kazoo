#!/usr/bin/perl
use LWP::Simple;
use File::Tail;

$out = `ps aux | grep $0 | grep -v 'grep ' | wc -l`;
chomp $out;


use JSON; # to install, # sudo cpan JSON
$json_engine	= JSON->new->allow_nonref;

if ($out > 1) {
    warn "another $0 is already running, quit! ...";
    exit 0;
}

my $now_file = "/tmp/fail2ban_now.log";
my $lock_file = '/tmp/fail2ban_restart.lock';

my $txt = `cat /etc/e911.conf`;
    
my %config = ();
for (split /\n/, $txt) {
    my ($key, $val)	= split /=/, $_, 2;
    
    if ($key) {
        $config{$key} = $val;
        warn "$key=$val\n";
    }
}


my $file = "/var/log/2600hz/kazoo.log";


#{"data":{"state":"in_service","used_by":"callflow","state":"in_service","used_by":"callflow","numbers":["+18183092674"],"ui_metadata":{"version":"3.22-34","ui":"monster-ui","origin":"common"},"id":"+18183092674","cnam":{"display_name":"Velantro"},"dash_e911":{"postal_code":"91204","street_address":"730 S Central Ave","extended_address":" #211, Glendale","locality":"Glendale","region":"California"},"_read_only":{"created":63648768639,"modified":63649089017,"state":"in_service","used_by":"callflow"}},"revision":"undefined","request_id":"71787e0a76c587d059effa8b064be4cd","status":"success","auth_token":"f99a5e06bca1fb15bc6380e4879ee155"}
$size = 0;

my $file = File::Tail->new(name => "/var/log/2600hz/kazoo.log", tail => 0, interval => 2);
while (defined($line = $file->read)) {	

# warn $line, "\n";
#2014-10-27 19:36:47,003 fail2ban.actions: WARNING [freeswitch-tcp] Ban 71.95.176.58
	if ($line =~ / request has a json payload: (.+)$/) {
	    my $json = $1;
	    next unless $line =~ /dash_e911/;
	    &out("[e911-json] $json\n");

	    %options = &Json2Hash($json);
	    
	   
	    $did = $options{data}{id}; $did =~ s/\D//g; $did =~ s/^1//g;
	    next unless $did =~ /^1?\d{10}$/;
			
			&out("invalid: $json\n");
	    $name = $options{data}{cnam}{display_name} || 'Velantro';
	    $address =  $options{data}{dash_e911}{street_address};
	    $city = $options{data}{dash_e911}{locality};
	    $state = $options{data}{dash_e911}{region};
	    $zip = $options{data}{dash_e911}{postal_code};
	    
	    
	    $url = "http://api.vitelity.net/api.php?login=$config{api_user}&pass=$config{api_pass}&cmd=e911send&did=$did&name=$name&address=$address&city=$city&state=$state&zip=$zip";
	    
	    &out("url: $url\n");
	    
	    $res = get $url;
	    &out("response: $res\n");			        
				
	}
}

sub Json2Hash(){
	local($json_plain) = @_;
	local(%json_data);
	my %json_data = ();

	
	
	if ($json_plain ne "") {
		local $@;
		eval {
			$json_data_reference	= $json_engine->decode($json_plain);
		};
		
		if ($@) {warn $@}
		%json_data			= %{$json_data_reference};
	}
	return %json_data;
}


sub out() {
    local $str = shift;
    open LOG, ">> /tmp/e911.log";

    print "[", &now(), "] ", $str, "\n";
    print LOG "[", &now(), "] ", $str, "\n";
    close LOG;
}

sub now() {
    @v = localtime;
    return sprintf("%04d-%02d-%02d %02d:%02d:%02d", 1900+$v[5],$v[4]+1,$v[3],$v[2],$v[1],$v[0]);
}
