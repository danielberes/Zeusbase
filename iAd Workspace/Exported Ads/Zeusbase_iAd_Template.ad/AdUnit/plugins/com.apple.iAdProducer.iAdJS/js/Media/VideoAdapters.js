
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.Video_5_0",superclass:iAd.Video,iOSVersion:"5.0",mixins:[iAd.VideoDOMReconstruct,iAd.VideoTouchEvents,iAd.VideoFullscreenLaunch,iAd.MediaCompetitionPause,iAd.MediaUnloadTearDown,iAd.MediaUnloadAndRestoreTime]});iAd.Media.registerMediaAdapter(iAd.Video,iAd.Video_5_0);iAd.Class({name:"iAd.Video_4_3",superclass:iAd.Video,iOSVersion:"4.3",mixins:[iAd.VideoDOMReconstruct,iAd.VideoTouchEvents,iAd.VideoFullscreen,iAd.VideoInlineLock,iAd.MediaCompetitionUnload,iAd.MediaLoop,iAd.MediaUnloadTearDown,iAd.MediaUnloadAndRestoreTime]});iAd.Media.registerMediaAdapter(iAd.Video,iAd.Video_4_3);iAd.Class({name:"iAd.Video_4_2",superclass:iAd.Video,iOSVersion:"4.2",mixins:[iAd.VideoDOMReconstruct,iAd.VideoTouchEvents,iAd.VideoFullscreen,iAd.VideoInlineLock,iAd.MediaCompetitionUnload,iAd.MediaForceLoad,iAd.MediaLoop,iAd.MediaUnloadTearDown,iAd.MediaUnloadAndRestoreTime]});iAd.Media.registerMediaAdapter(iAd.Video,iAd.Video_4_2);