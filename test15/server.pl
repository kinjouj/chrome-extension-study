use strict;
use warnings;
use utf8;
use AnyEvent;
use AnyEvent::Socket;

tcp_server undef, 5555, sub {
    my $fh = shift;

    warn "@_";

    my $w;
    $w = AnyEvent->io(
        fh => $fh,
        poll => 'r',
        cb => sub {
            my $r = sysread $fh, my $buf, 4096;

            if ($r == 0) {
                undef $w;

                return;
            }

            syswrite $fh, uc($buf)."\n";
        }
    );
};

AnyEvent->condvar->recv;
