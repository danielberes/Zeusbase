
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.Audio_5_0",superclass:iAd.Audio,iOSVersion:"5.0",mixins:[iAd.MediaCompetitionPause]});iAd.Media.registerMediaAdapter(iAd.Audio,iAd.Audio_5_0);iAd.Class({name:"iAd.Audio_4_3",superclass:iAd.Audio,iOSVersion:"4.3",mixins:[iAd.MediaCompetitionUnload,iAd.MediaLoop]});iAd.Media.registerMediaAdapter(iAd.Audio,iAd.Audio_4_3);iAd.Class({name:"iAd.Audio_4_2",superclass:iAd.Audio,iOSVersion:"4.2",mixins:[iAd.MediaCompetitionUnload,iAd.MediaForceLoad,iAd.MediaLoop]});iAd.Media.registerMediaAdapter(iAd.Audio,iAd.Audio_4_2);