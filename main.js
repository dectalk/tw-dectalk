(function(Scratch){
	if(!Scratch.extensions.unsandboxed) {
		throw new Error("DECtalk must be run unsandboxed");
	}

	const prefix = "http://localhost:8000";
	let Module, speak, speak_init;
	let g_buffer = {};
	let embedded = 0;

	/* EMBED WASM STUFF HERE */

	window.onDECtalkAudioCallback = function(tts, buffer, length, phoneme) {
		let arr_r = new Int16Array(Module.HEAP16.buffer, buffer, length);
		let arr = new Int16Array(length);
	
		for(let i = 0; i < arr.length; i++) arr[i] = arr_r[i];

		if(!g_buffer[tts]) g_buffer[tts] = [];
		g_buffer[tts].push(arr);
	};

	class DECtalk {
		getInfo() {
			return {
				id: "dectalk",
				name: "DECtalk",
				blocks: [
					{
						opcode: "speak",
						blockType: Scratch.BlockType.COMMAND,
						text: "Speak [TEXT]",
						arguments: {
							TEXT: {
								type: Scratch.ArgumentType.STRING
							}
						}
					}
				]
			};
		}

		speak(args) {
			return new Promise(function(res,rej) {
				const audioContext = Scratch.vm.runtime.audioEngine.audioContext;
				const str = Module.stringToNewUTF8(args.TEXT);
				const tts = speak(str);
				Module._free(str);

	
				let b = 0;
				if(g_buffer[tts]){
					for(let i = 0; i < g_buffer[tts].length; i++){
						b += g_buffer[tts][i].length;
					}
				}else{
					res();
				}
			
				const audioBuffer = audioContext.createBuffer(1, b, 11025);
				const channelData = audioBuffer.getChannelData(0);
			
				b = 0;
			
				for(let i = 0; i < g_buffer[tts].length; i++){
					for(let j = 0; j < g_buffer[tts][i].length; j++){
						channelData[b + j] = g_buffer[tts][i][j] / 32767;
					}
					b += g_buffer[tts][i].length;
				}

				const currentSource = audioContext.createBufferSource();
				currentSource.buffer = audioBuffer;
				currentSource.connect(audioContext.destination);

				currentSource.onended = function() {
					res();
				};
	    
				currentSource.start();

				if(g_buffer[tts]) delete g_buffer[tts];
			});
		}
	};

	new Promise(function(res, rej) {
		async function init(res) {	
			Module = await DECtalkMini();
			speak_init = Module.cwrap("speak_init", null, []);
			speak = Module.cwrap("speak", "number", ["number"]);

			speak_init();

			Scratch.extensions.register(new DECtalk());

			res();
		}

		if(embedded){
			init(res);
		}else{
			const script = document.createElement("script");
			script.src = prefix + "/dtc.js";
			script.onload = function() {
				console.log("DECtalk has been loaded");

				init(res);
			};
			document.body.appendChild(script);
		}
	});
})(Scratch);
