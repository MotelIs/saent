var Analytics = function() {

  this.trackMacDownload = function() {

    ga('send', {
      hitType: 'event',
      eventCategory: 'Downloads',
      eventAction: 'download saent for mac',
      eventLabel: 'Download Saent for Mac',
      transport: 'beacon'
    });
  }

  this.trackWindowsDownload = function() {

    ga('send', {
      hitType: 'event',
      eventCategory: 'Downloads',
      eventAction: 'download saent for windows',
      eventLabel: 'Download Saent for Windows',
      transport: 'beacon'
    });
  }

  return this;
}
