import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
    Event
} from 'react-native-track-player';

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getActiveTrackIndex();
        isSetup = true;
    }
    catch {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior:
                    AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
            progressUpdateEventInterval: 2,
        });

        isSetup = true;
    }
    finally {
        return isSetup;
    }
}

export async function addTracks(List) {
    await TrackPlayer.add(List);
}

export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause, async () => {
        console.log('Event.RemotePause');
        await TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        console.log('Event.RemotePlay');
        await TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        console.log('Event.RemoteNext');
        await TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        console.log('Event.RemotePrevious');
        await TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener(Event.RemoteSeek, async (data) => {
        console.log('Event.RemoteSeek', data);
        await TrackPlayer.seekTo(data.position);
    });
}