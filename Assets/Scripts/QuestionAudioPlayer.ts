import { log } from './Modules/Utils';

/**
 * Plays a different audio track for each question.
 *
 * Wire this up via the Lifecycle component:
 *   onNextQuestion → Kind: "Script method" → Method: "playForQuestion"
 *
 * The Lifecycle system calls onNextQuestion with three arguments:
 *   (questionIndex: number, questionViewIndex: number, isLast: boolean)
 * This script uses questionIndex to pick the matching track.
 *
 * Assign one AudioTrackAsset per question, in the same order as your questions
 * in ScriptQuizData. If a question has no matching track the script skips it
 * silently — so you can leave gaps in the array using the Inspector.
 */
@component
export class QuestionAudioPlayer extends BaseScriptComponent {
    @input
    @hint('The AudioComponent that will play the tracks. Add it to any SceneObject in the scene.')
    audioComponent: AudioComponent;

    @input
    @hint('One audio track per question, in the same order as your questions in ScriptQuizData.')
    audioTracks: AudioTrackAsset[];

    @input('float', '0')
    @hint('Seconds to wait before playing the audio after a question appears.')
    private readonly delaySeconds: number;

    private delayEvent: DelayedCallbackEvent;
    private pendingTrack: AudioTrackAsset | null = null;

    onAwake() {
        this.delayEvent = this.createEvent('DelayedCallbackEvent');
        this.delayEvent.bind(() => {
            if (this.pendingTrack) {
                this.audioComponent.audioTrack = this.pendingTrack;
                this.audioComponent.play(1);
                this.pendingTrack = null;
            }
        });
    }

    /**
     * Called by Lifecycle's onNextQuestion.
     * Signature matches what Lifecycle passes: (questionIndex, questionViewIndex, isLast).
     */
    public playForQuestion(questionIndex: number, _questionViewIndex: number, _isLast: boolean) {
        // Stop whatever is currently playing so it doesn't overlap.
        if (this.audioComponent.isPlaying()) {
            this.audioComponent.stop(false);
        }

        const track = this.audioTracks[questionIndex];
        if (!track) {
            log(`QuestionAudioPlayer: no audio track for question index ${questionIndex}, skipping.`);
            return;
        }

        if (this.delaySeconds > 0) {
            this.pendingTrack = track;
            this.delayEvent.reset(this.delaySeconds);
        } else {
            this.audioComponent.audioTrack = track;
            this.audioComponent.play(1);
        }
    }

    /** Call this from Lifecycle's onResultShown or onQuestionsHidden to silence any leftover audio. */
    public stopAudio() {
        this.delayEvent.reset(-1); // cancel any pending delayed play
        this.pendingTrack = null;
        if (this.audioComponent.isPlaying()) {
            this.audioComponent.stop(true);
        }
    }
}
