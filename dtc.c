#include <epsonapi.h>
#include <emscripten.h>

EM_JS(void, js_audio_callback, (void* tts, short* data, long length, int phoneme), {
	if(window.onDECtalkAudioCallback) window.onDECtalkAudioCallback(tts, data, length, phoneme);
});

EMSCRIPTEN_KEEPALIVE short* audio_callback(void* tts, short* data, long length, int phoneme){
	js_audio_callback(tts, data, length, phoneme);
	return data;
}

EMSCRIPTEN_KEEPALIVE void speak_init(void){
	TextToSpeechSafeInit();
}

EMSCRIPTEN_KEEPALIVE void* speak(const char* string){
	void* tts = TextToSpeechAllocate();
	TextToSpeechInitEx(tts, NULL, audio_callback, NULL);
	TextToSpeechStartEx(tts, (char*)string, NULL, WAVE_FORMAT_1M16);
	TextToSpeechSyncEx(tts);
	TextToSpeechFree(tts);

	return tts;
}
